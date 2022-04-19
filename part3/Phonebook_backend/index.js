const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json())
app.use(morgan("tiny"));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('-----------------------')
  next()
}

app.use(requestLogger)

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


app.get("/", (req, res) => {
    res.send("<h1>Hello </h1>")
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).json({
            error: `can't find id`
        })
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get("/info", (req, res) => {
    var time = new Date()
    res.send(`<div><p>Pheonebook has info for 2 people</p><p>${time}</p></div>`)
})

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

app.post("/api/persons", (req, res) => {
    const body = req.body
    const { name, number } = body;

    if (!body.name || !body.number) {
        return res.status(400).json({ 
          error: 'The name or number is missing' 
        })
    }

    const isDuplicate = persons.find((person) => person.name === name)

    if (isDuplicate) {
        return res.status(400).json({
          error: "The name already exists in the phonebook",
        });
    }

    const person = {
      id: getRandomInt(1000),
      name,
      number,
    };
    persons.push(person);
    res.json(person);
  });

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})