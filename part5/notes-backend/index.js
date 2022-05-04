const express = require('express')
const app = express()

let notes = [
  {
    id: 1,
    content: "Browser can execute only Javascript",
    date: "2022-04-23T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "User id of the note creator is at the start sent along the request",
    date: "2022-04-24T08:12:40.098Z",
    important: false
  },
  {
    id: 3,
    content: "The existing code and tests need to be changed when user is added to system",
    date: "2022-04-24T09:20:35.098Z",
    important: true
  },
  {
    id: 4,
    content: "Testing the token authentication",
    date: "2022-04-25T12:09:12.098Z",
    important: true
  },
  {
    id: 5,
    content: "Sing Page App use token authentication",
    date: "2022-04-25T12:15:12.098Z",
    important: true
  },
]

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})