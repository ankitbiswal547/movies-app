
# Movies App

One stop destination for all your movie searches. Enter your query and we will suggest you some of the best movies related to your query.


## API Reference

#### Get all items
I have used OMDB API for all the movies posters and details.

```http
  GET http://www.omdbapi.com/?apikey={api_key}&s={query}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `query` | `string` | **Required**. Your Search Term |



## Demo

Hosted on Heroku - [https://movies-collected.herokuapp.com/](https://movies-collected.herokuapp.com/)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OMDB_API_KEY`

`DB_URL`


## Run Locally

Clone the project

```bash
  git clone https://github.com/ankitbiswal547/movies-app.git
```

Go to the project directory

```bash
  cd movies-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

# LOGO
![Logo](https://res.cloudinary.com/ankitcloudinary/image/upload/v1652424640/Movie%20App/you_1_h0r3t6.webp)


## Screenshots

![App Screenshot](https://res.cloudinary.com/ankitcloudinary/image/upload/v1652427540/Movie%20App/screencapture-movies-collected-herokuapp-2022-05-13-13_04_09_mbqe2x.webp)


![App Screenshot 2](https://res.cloudinary.com/ankitcloudinary/image/upload/v1652427545/Movie%20App/screencapture-movies-collected-herokuapp-search-2022-05-13-13_05_38_jkcgxs.webp)


![Mobile View](https://res.cloudinary.com/ankitcloudinary/image/upload/v1652427489/Movie%20App/screencapture-movies-collected-herokuapp-search-2022-05-13-13_05_57_jenbpo.webp)


![Login Page](https://res.cloudinary.com/ankitcloudinary/image/upload/v1652427466/Movie%20App/screencapture-movies-collected-herokuapp-login-2022-05-13-13_04_38_mujsmr.webp)


