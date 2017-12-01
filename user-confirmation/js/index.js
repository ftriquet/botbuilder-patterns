const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = 5000

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`)
  next()
})

// We will receive webhook calls on this route if the user doesn't
// confirm his name.
app.post('/reset-user-name', (req, res) => {
  // We get the memory in the request body
  const memory = req.body.conversation.memory

  // Throw invalid information away
  delete memory['user-name']
  delete memory['user-name-confirmation']

  // Send back the new memory state
  res.json({ conversation: { memory } })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
