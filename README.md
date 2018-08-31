# MADE Boilerplate

Mongo + Apollo server + Docker + Express graphql server boilerplate.

## Pre requirements

* MongoDB - if not using docker
* docker & docker-compose - if using docker

## Installation

* `npm i`
* create your .env file. Example is in .env.example.

## Running

`docker-compose up --build` - To use the docker image

or

`npm start` - running with locally installed mongodb and autoreload with nodemon.

* don't forget to change DB_HOST=localhost inside .env file when using local mongoDb installation.

## Scripts

* `npm start` - starts server for local development. Only used if not using docker.

## Already created graphql types

### User

To create a new user use the mutation:

* `register(name: "Thanos", email: "thanos@universe.com", password: "infinityStars")`

To login use the mutation:

`login(email: "thanos@universe.com", password: "infinityStars")`

### Post

To create a post use the mutation:

* `addPost(text: "New post")`

### PostConnection

Used for returning cursor based pagginated posts.

### UserConnection

Used for returning cursor based pagginated users.

## Root Queries

### me

Used to get the current logged in user

* `query { me { id email firstName lastName } }`

### post

Used to get a single post with a postId

* `query { post(id:"postId") { id text } }`

### posts

Used to get all posts

* `query { posts { edges { post { id text createdAt updatedAt } cursor } pageInfo { startCursor endCursor hasNextPage hasPreviousPage } } }`

### users

Used to get all users

* `query { users { edges { user { id email firstName lastName createdAt updatedAt } cursor } pageInfo { startCursor endCursor hasNextPage hasPreviousPage } } }`

## Root Mutations

### login

* `login( email: String! password: String! ): User`

### register

* `register( name: String! email: String! password: String! ): User`

### updateProfile

* `updateProfile( firstName: String lastName: String email: String ): User`

### changePassword

* `changePassword( oldPassword: String! newPassword: String! ): User`

### addPost

* `addPost( text: String ): Post`

## Admin Mutation

These are mutations only available for an admin user ( a user with a role set to "admin")

### Delete a post/posts

* `deletePost( postIds: [ID!]! ): [Post]!`

### Change a user's role

* `changeUserRole( userId: ID! role: String! ): User`

## Tips

* don't forget to add any new env variables to the .env file
* * don't forget to change DB_HOST=localhost inside .env file when using local mongoDb installation.
* If you've installed new npm plugins, do:

  1.  `docker-compose stop node`
  2.  `docker-compose build node`
  3.  `docker-compose up -d --no-recreate node`

  or

  You could just `npm install` any new packages inside the node container itself.

  1.  `docker-compose excec node bash`
  2.  `npm intall <packageName>`inside bash.
