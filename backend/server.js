/* eslint-disable no-undef */
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Для получения текущей директории в ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

// Подключение к базе данных
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

app.use(express.json()) // Для парсинга JSON тела запросов
app.use(cors()) // Для разрешения кроссдоменных запросов

// Схема пользователя (User) с полем пароля для логина
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user: { type: String, required: true },
  dictionaries: [
    {
      name: String,
      words: [{ term: String, translation: String }],
    },
  ],
})

const User = mongoose.model('User', UserSchema)

// Регистрация пользователя
app.post('/users/register', async (req, res) => {
  const { email, password, user } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const newUser = new User({ email, password, user })
  await newUser.save()
  res.status(201).json({ message: 'User created successfully' })
})

// Логин пользователя
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.json({ message: 'Login successful' })
})

// Получить пользователя по email
app.get('/users/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email })
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

// Добавление слова в словарь пользователя
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

// Обслуживание статики фронтенда (React build), если фронтенд собран в корне
app.use(express.static(path.join(__dirname, 'build')))

// Возвращаем index.html для всех других маршрутов (для корректной работы SPA)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// Запуск сервера
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})
