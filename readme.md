# Simple-Blog-Website-

## Live Demo

The application is deployed at: [Deployed Link](https://simple-blog-website-apct.onrender.com/)

## Description

This is a Node.js application that serves content from a database. It fetches a post by its ID and returns the post body. If the post is not found, it throws an error. If any error occurs during the process, it logs the error and throws a new error.

## Installation

1. Clone the repository: `git clone https://github.com/patiljay956/Simple-Blog-Website-.git`
2. Navigate into the directory
3. Install the dependencies: `npm install`

## Configuration

This application requires two environment variables:

- `PORT`: The port on which the server will run. If not specified, it defaults to 3000.
- `MONGO_URI`: The connection string for the MongoDB database.

These can be set in a `.env` file in the root of the project. Here is a sample `.env` file:

```properties
PORT=3000
MONGO_URI=
```
