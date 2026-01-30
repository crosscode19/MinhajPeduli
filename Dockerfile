FROM php:8.4-cli

WORKDIR /app
COPY . .

# Install dependencies
RUN apt-get update && apt-get install -y \
    unzip git libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project dependencies
RUN composer install --optimize-autoloader --no-interaction --no-scripts

# Generate application key if missing (build-time fallback)
RUN php artisan key:generate || true

# Fix permissions for storage and cache (best effort)
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache || true

# Expose port used by Railway
EXPOSE 8080

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]
