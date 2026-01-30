# Stage 1: Build assets dengan Node
FROM node:20 AS node_builder
WORKDIR /app

# Copy file yang diperlukan untuk npm
COPY package.json package-lock.json ./
RUN npm install

# Copy seluruh project dan build
COPY . .
RUN npm run build

# Stage 2: PHP + Composer
FROM php:8.4-cli

WORKDIR /app

# Install dependencies sistem
RUN apt-get update && apt-get install -y \
    unzip git libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy project
COPY . .

# Copy hasil build dari stage Node ke public/build
COPY --from=node_builder /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-interaction --no-scripts

# Generate app key (fallback)
RUN php artisan key:generate || true

# Fix permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache || true

# Expose port
EXPOSE 8080

# Jalankan Laravel
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]
