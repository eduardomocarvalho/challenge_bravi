FROM nginx:1.20.1-alpine

COPY public /var/www/html/public/
COPY ./docker/nginx/laravel.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
