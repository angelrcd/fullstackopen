import express from 'express'
import morgan from 'morgan';

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

const PORT = 3001;

morgan.token('reqbody', (req, res) => {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
})

const app = express();
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))

// INFO
app.get('/info', (req, res) => {
  const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `
  res.send(html)
})

// GET all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// GET single person
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(x => x.id === id);

  if(!person)
    return res.status(404).end()

  res.json(person)
})

// POST new person
app.post('/api/persons', (req, res) => {
  const newPerson = req.body;
  newPerson.id = Math.floor(Math.random() * Number.MAX_VALUE);

  const isNameRepeated = persons.find(x => x.name === newPerson?.name)

  // if(!newPerson.name || !newPerson.number || isNameRepeated)
  //   return res.status(400).end();
  if(!newPerson.name)
    return res.status(400).json({error: "no name"})
  
  if(!newPerson.number)
    return res.status(400).json({error: "no number"})

  if(isNameRepeated)
  return res.status(400).json({error: "name must be unique"})

  persons.push(newPerson);
  res.status(201).json(newPerson)
})

// DELETE single entry
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, ()=> {
  console.log("Listening on port 3001");
})