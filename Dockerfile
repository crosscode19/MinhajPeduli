# Stage 1: Build frontend assets dengan Node
FROM node:20 AS node_builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: PHP-FPM untuk Laravel
FROM php:8.4-fpm AS php_stage

WORKDIR /var/www/html

# Install dependencies sistem
RUN apt-get update && apt-get install -y \
    unzip git libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install zip pdo pdo_mysql mbstring gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy project
COPY . .

# Copy hasil build dari Node ke public/build
COPY --from=node_builder /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-interaction --no-dev

# Ensure an .env exists for build-time tasks (do not overwrite if provided)
RUN if [ ! -f .env ] && [ -f .env.example ]; then cp .env.example .env; fi

# NOTE: Do NOT cache config at build-time here so runtime environment variables
# (like Railway's APP_KEY) are respected. We'll clear any cached config at container
# startup in the entrypoint instead.

# Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Stage 3: Final image with php-fpm + nginx
# Use `php_stage` as the base so installed PHP extensions and Composer
# artifacts are preserved into the final runtime image.
FROM php_stage AS final

# Install nginx
RUN apt-get update && apt-get install -y nginx \
    && rm -rf /var/lib/apt/lists/*

# Copy konfigurasi Nginx
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

# Copy project dari php_stage
COPY --from=php_stage /var/www/html .

# Add entrypoint to start php-fpm then nginx
COPY docker/docker-entrypoint-nginx.sh /usr/local/bin/docker-entrypoint-nginx.sh
RUN chmod +x /usr/local/bin/docker-entrypoint-nginx.sh

# Expose port (Railway will inject PORT)
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/docker-entrypoint-nginx.sh"]
CMD ["nginx", "-g", "daemon off;"]
