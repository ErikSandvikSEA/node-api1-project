//import express
const express = require('express')

//create a server
const server = express()

//middleware - to teach express new tricks
server.use( express.json() ) //to arse JSON from the body

//listen for incoming request
const port = 8000

server.listen(port, () => console.log(`\n ----- Listening on port ${port} ----- \n`))


//users
let users = [
     {
          id: 1,
          name: 'Erik Sandvik',
          bio: 'Lambda School Student',
     },
     {
          id: 2,
          name: 'Cider the Dog',
          bio: `Knows sit, shake, and "Walk?"`
     }
]

server.get(`/`, (req, res) => {
     res.send(`Users API Working`)
})

server.get(`/users`, (req, res) => {
     res.status(200).json(users)
})









