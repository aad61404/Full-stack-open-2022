// mongosh "mongodb+srv://fullstacklearn.jov3x.mongodb.net/myFirstDatabase" --apiVersion 1 --username aad61404

const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://aad61404:${password}@fullstacklearn.jov3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
//   `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: 'Arto Vihavainen',
  number: "045-1232456",
  date: new Date(),
  important: true,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  console.log("phonebook:")
  result.forEach(note => {
    // console.log('note:', note)
    console.log(note.name + note.number)
  })
  mongoose.connection.close()
})
