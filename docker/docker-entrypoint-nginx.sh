#!/bin/sh
set -e

# Ensure working directory
cd /var/www/html || true

# If APP_KEY provided by environment, ensure .env contains it so Laravel can use it
if [ -n "$APP_KEY" ]; then
	if [ ! -f .env ] && [ -f .env.example ]; then
		cp .env.example .env
	elif [ ! -f .env ]; then
		touch .env
	fi

	if grep -q "^APP_KEY=" .env 2>/dev/null; then
		sed -i "s|^APP_KEY=.*|APP_KEY=${APP_KEY}|" .env || true
	else
		echo "APP_KEY=${APP_KEY}" >> .env
	fi
fi

# If no APP_KEY available in env and none in .env, generate one
if [ -z "$APP_KEY" ]; then
	if [ -f .env ]; then
		if ! grep -q "^APP_KEY=.*" .env 2>/dev/null || [ "$(grep '^APP_KEY=' .env | cut -d'=' -f2)" = "" ]; then
			php artisan key:generate --force || true
		fi
	else
		if [ -f .env.example ]; then
			cp .env.example .env
			php artisan key:generate --force || true
		else
			php artisan key:generate --force || true
		fi
	fi
fi

# Clear any cached config so runtime environment variables are used
php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true
php artisan view:clear || true

# Ensure writable dirs
chown -R www-data:www-data storage bootstrap/cache || true

# Start php-fpm in background (daemonize)
php-fpm -D || true

# Exec the main container command (nginx in foreground)
exec "$@"
