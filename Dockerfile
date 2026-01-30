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

# Pastikan APP_KEY ada (safe - will write to .env if missing)
RUN grep -q "APP_KEY=" .env || php artisan key:generate --force || true

# Cache config & route
RUN php artisan config:cache && php artisan route:cache

# Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Stage 3: Nginx sebagai web server
FROM nginx:stable

# Copy konfigurasi Nginx
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

# Copy project dari php_stage
COPY --from=php_stage /var/www/html .

# Expose port (Railway akan inject PORT)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
