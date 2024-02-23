const express = require("express")
const app = express()

// add database stuff
require("dotenv").config()
const Person = require("./models/person")

// Use cors to bypass single origin policy
const cors = require("cors")
app.use(cors())

// stringify json for me and put it in the body
app.use(express.json())

// to make express show static content
app.use(express.static('dist'))

// made a custom token called "data" that shows the body in morgan
const morgan = require("morgan")
morgan.token("data", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

// rest of app
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

// Get all the people
app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Get info
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people.</p>
     <p>${Date()}</p>`
  )
})

// Get a specific person
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Delete a specific person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

// Create a person
// add a phonebook entry
app.post('/api/persons/', (request, response) => {
  const person = { ...request.body }
  if (!person.name) {
    response.status(400).json({
      error: "name is missing"
    })
  } else if (!person.number) {
    response.status(400).json({
      error: "number is missing"
    })
  } else if (persons.find(p => p.name === person.name)) {
    response.status(400).json({
      error: "name is already in phonebook"
    })
  } else {
    const dbPerson = new Person({
      name: person.name,
      number: person.number
    })
    dbPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})