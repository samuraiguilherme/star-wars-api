# Star Wars App
## _by Guilherme Yagui_

This is an exercise for testing purposes only. The intention is to showcase programming skills using

- PHP (Laravel)
- React
- Docker

That's why the .env and database.sqlite files were commited since they contain no sensitive information.

## Features

- Search People and Films by term
    - Autocomplete Google style
- Character details
- Movie details

## Tech

- [React] - The library for web and native user interfaces
- [Laravel] - The PHP Framework for Web Artisans
- [Docker] - Accelerated Container Application Development

## Installation

Star Wars App requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) to run. Make sure it is up and running before running the commands.

Install the dependencies and start the server:

```sh
cd star-wars-api
docker run --rm --interactive --tty -v $(pwd):/app composer install
./vendor/bin/sail up -d
./vendor/bin/sail npm i
./vendor/bin/sail npm run dev
```

Verify the deployment app by navigating to your server address in your preferred browser.

```sh
http://localhost
```

## License

MIT

**Free Software, Hell Yeah!**

   [Laravel]: <https://laravel.com/>
   [React]: <https://react.dev/>
   [Docker]: <https://www.docker.com/>
