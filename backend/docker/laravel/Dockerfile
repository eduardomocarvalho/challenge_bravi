FROM php:8.2-fpm-alpine

ARG WWWGROUP=1000

WORKDIR /var/www/html

RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS curl-dev openssl-dev pcre-dev pcre2-dev zlib-dev && \
    apk add --no-cache \
    libstdc++ \
    bash \
    su-exec \
    libnsl \
    libaio \
    libc6-compat \
    git \
    unzip \
    shadow \
    supervisor && \
    docker-php-ext-install \
    pcntl \
    pdo \
    pdo_mysql

RUN ln -sf /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1 && \
    ln -sf /lib/libc.so.6 /usr/lib/libresolv.so.2 && \
    ln -sf /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

RUN adduser -g $WWWGROUP -u 1000 -D sail

COPY ./docker/laravel/supervisord.conf /etc/supervisord.conf

COPY ./docker/laravel/start-container /usr/local/bin/start-container
COPY ./docker/laravel/php.ini /usr/local/etc/php/conf.d/99-custom.ini

RUN chmod +x /usr/local/bin/start-container

COPY composer.json composer.lock /var/www/html/
RUN if [ "$APP_ENV" = "production" ] ; then \
    composer install --no-scripts --no-interaction --optimize-autoloader --no-dev; \
    else \
    composer install --no-scripts --no-interaction; \
    fi

COPY . /var/www/html/
RUN mkdir -p storage/framework/{cache,sessions,views} storage/logs && \
    chmod -R 777 storage bootstrap/cache

RUN composer dump-autoload --optimize \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

EXPOSE 9000
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
