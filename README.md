# Notepad App

This project is a Notepad App built using JavaScrit. you can use this like a notepad for your team and this is possible because of websockets, to use you need to put your name and server's name(remember to put the same server name of your team), when you write in text area, it will show in the text area of your team, and same as well for you

Link to see the project: https://notepad-eb1212.vercel.app/

## Features

* Real time changes with Websockets
* Displays server's name
* Display number of user
* Redis to store the data


## Stack

**Front-end:** JavaScript  
**Back-end:** Node.js  
**Packages:** Express, ioredis, pusher, dotenv and cors

## Learnings

In this project i learned how to use Websockets, how to authenticate and authorize a user and how to use redis

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Enviroments variables

To run this project, you need to add this variable in your .env file

`DB_PASSWORD` and `PUSHER_SECRET`

To create `DB_PASSWORD`: https://redis.io/

To create `PUSHER_SECRET`: https://pusher.com/


### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/EduBarreira1212/notepad.git
    cd notepad
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```
3. Inicie o servidor

    ```bash
    cd server
    npm run start
    ```
## Author

- [@EduBarreira1212](https://github.com/EduBarreira1212)


## Licença

[MIT](https://choosealicense.com/licenses/mit/)