# Server App: built with Express

## Purpose
The Server app takes care of numerous operations, including:

* Find connected devices in the same local network
* Interact with the operating system
* Manages data while the app is open
* Manages permanent app configurations
* Interacts with other connected devices to stream files and folders to those who request it

## Start Server
The first time, if you have not, [download and install Node.js](https://nodejs.org/en/download/), then - from root project folder - install all Server app's required packages:

`npm install`

Start the Server in dev mode:

`node server.dev.js`

For convenience you can [install nodemon](https://www.npmjs.com/package/nodemon) and start the Server in dev mode (after each edit you will not have to restart the server): 

`nodemon server.dev.js ./`