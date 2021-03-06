//import express
const express = require('express')

//create a server
const server = express()

//middleware - to teach express new tricks
server.use( express.json() ) //to arse JSON from the body

//listen for incoming request
const port = 8000

server.listen(port, () => console.log(`\n ----- Listening on port ${port} ----- \n`))



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

//handle GET requests for `/`
server.get(`/`, (req, res) => {
     res.send(`Users API Working`)
})

//handle POST for '/api/users'
server.post(`/api/users`, (req, res) => {
     const newUser = req.body
     try{
          if (!newUser.name || !newUser.bio){
               return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
          } else {
               users.push(newUser)
               return res.status(201).json(users)
          }
     } catch(error){
          return res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
     }
})


//handle GET requests for /api/users
server.get(`/api/users`, (req, res) => {
     try{
          return res.status(200).json(users)
     }
     catch(error){
          return res.status(500).json({ errorMessage: "The users information could not be retrieved." })
     }     
})

//handle GET requests for /api/users/:id
server.get(`/api/users/:id`, (req, res) => {
     const urlId = req.params.id
     let singleUser = users.filter(user =>  user.id === Number(urlId))
     
     try{
          if(!singleUser[0]){
          return res.status(404).json({ message: "The user with the specified ID does not exist." })
          } else {
               return res.status(200).json(singleUser[0])
          }
     } catch(error) {
          return res.status(500).json({ errorMessage: "The user information could not be retrieved." })
     }
})

//handle delete request to /api/users/:id
server.delete(`/api/users/:id`, (req, res) => {
     const urlId = req.params.id
     let filteredUsersArray = users.filter(user =>  user.id !== Number(urlId))

     try{
          if(!filteredUsersArray){
               return res.status(404).json({ message: "The user with the specified ID does not exist." })
          } else {
               return res.status(200).json(filteredUsersArray)
          }
     } catch(error){
          return res.status(500).json({ errorMessage: "The user could not be removed" })
     }
})

//handle put request to /api/users/:id
server.put(`/api/users/:id`, (req, res) => {
     const urlId = req.params.id
     let singleUser = users.filter(user =>  user.id === Number(urlId))
     const editedUser = req.body
     try{
          if (!singleUser){
               return res.status(404).json({ message: "The user with the specified ID does not exist." })
          } else if (!editedUser.name || !editedUser.bio){
               return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
          } else {
               return res.status(200).json(editedUser)
          }
     } catch(error){
          return res.status(500).json({ errorMessage: "The user information could not be modified." })
     }
})







