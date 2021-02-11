## The nest-seed project

This project tries to offer you a relatively clean (for complains, contact the writer) REST API skeleton with the following features :

- A 100% typescript codebase than uses Domain Driven Design
- A live server that compile and reload the server at every file change
- Dockerized
- With environments configuration (local, dev, staging, prod by default)
- A Configured swagger documentation (expect for production env)
- API fully secured with an API_KEY


### Prerequisites

You need Node.js, yarn and an IDE like Webstorm installed.
The use of Docker for development is optional but recommended.
The project uses a mongodb database, for local development you can use a local instance on your host machine or the once used by default in the docker-compose
You can get a free sandbox for dev, staging and prod environment (do not put a mongodb container in Google Cloud Run) at https://cloud.mongodb.com/

### Configure the project

  The server starts with the local env by default, to change the NODE_ENV: 'local' to another env conf if need
  
## Getting Started

Install all the dependencies with :

```
yarn install
```

### Running locally

Start the project on local with :

```
yarn start:live
```

## Running with Docker

This project can be built with Docker with this simple line command :

```
yarn start:docker
```

or

```
docker-compose up --build
```

tart:live
```
