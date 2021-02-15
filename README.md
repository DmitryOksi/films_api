readme

INSTRUCTION FOR STARTING:

1)
-cd to project dir, 
-touch .env file, 
- nano .env and place(be careful, my db have credentials): 

DB_CONNECTION = mongodb://user:123@localhost/tz
PORT = 6000

2)
install packages
npm i

3)
in the main dir you can find doc_api.txt file, in the file you can find all cli commands to check api


PROJECT STRUCTER:

/context/index.js (connection to mongodb)
/helpers/parseFileToJSON.js - function for parsing text to json
/models/film.js - mongoose schema for films collection
/routes/film.js - api 
/uploads - before storing documents from the file in db i store the file in uploads folder and then remove it
.env - for safety purpose
app.js main file with creating server.
cli.js - allowing to communicate with server from console
data.txt - file with films.
doc_api.txt - cli commands for communication with server

