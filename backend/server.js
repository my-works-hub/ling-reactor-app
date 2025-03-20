import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const UserSchema = new mongoose.Schema({
  email: String,
  dictionaries: [
    {
      name: String,
      words: [{ term: String, translation: String }],
    },
  ],
})

const User = mongoose.model('User', UserSchema)

app.get('/users/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email })
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

app.post('/users/:email/dictionary/:dictName', async (req, res) => {
  const { term, translation } = req.body
  const user = await User.findOne({ email: req.params.email })

  if (!user) return res.status(404).json({ message: 'User not found' })

  const dictionary = user.dictionaries.find(
    (d) => d.name === req.params.dictName
  )
  if (!dictionary)
    return res.status(404).json({ message: 'Dictionary not found' })

  dictionary.words.push({ term, translation })
  await user.save()
  res.json({ message: 'Word added successfully' })
})

app.listen(5000, () => console.log('Server running on port 5000'))
