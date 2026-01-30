#!/bin/sh
set -e

# Start php-fpm in background (daemonize). If it fails, continue so docker can show logs.
php-fpm -D || true

# Exec the main container command (nginx in foreground)
exec "$@"
