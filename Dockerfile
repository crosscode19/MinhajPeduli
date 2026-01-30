FROM php:8.4-cli

WORKDIR /app
COPY . .

RUN apt-get update && apt-get install -y \
    unzip git libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
