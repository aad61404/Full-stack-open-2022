const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();

require("dotenv").config();
const Person = require('./Person')

app.use(express.static('build'))
app.use(cors())

app.use(express.json())
// app.use(morgan("tiny"));
// sample
// morgan.token('type', function (req, res) { return req.headers['content-type'] })
// app.use(morgan(':type :method :url :status :res[content-length] - :response-time ms'))
morgan.token('content', function (req, res) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

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
  Person.find({}).then((persons) => {
    res.json(persons);
  });
})

app.get("/api/persons/:id", async (req, res) => {
    const id = req.params.id
    const person = await Person.findById(id);

    if (person) {
        res.json(person)
    } else {
        res.status(404).json({
            error: `can't find id`
        })
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const isPersonExist = await Person.findById(id);

    if (isPersonExist) {
      await Person.findByIdAndRemove(id);
      res.json({ success: true });
    } else {
      return res.status(400).json({
        error: "person not exists in the phonebook",
      });
    }
})

app.get("/info", (req, res) => {
    var time = new Date()
    res.send(`<div><p>Pheonebook has info for 2 people</p><p>${time}</p></div>`)
})

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

app.post("/api/persons", async (req, res) => {
    const body = req.body
    const { name, number } = body;

    if (!body.name || !body.number) {
        return res.status(400).json({ 
          error: 'The name or number is missing' 
        })
    }

    const isDuplicate = await Person.findOne({ name: name });

    if (isDuplicate) {
        return res.status(400).json({
          error: "The name already exists in the phonebook",
        });
    }
    const person = {
      name,
      number,
    };

    const newPPL = await new Person(person)
    await newPPL.save()
    res.json(newPPL);
  });

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})