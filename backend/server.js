import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json()) // Для парсинга JSON тела запросов
app.use(cors()) // Для разрешения кроссдоменных запросов

// Схема пользователя (User) с полем пароля для логина
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Добавляем пароль
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
  const { email, password } = req.body

  // Проверяем, существует ли уже пользователь с таким email
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  // Создаем нового пользователя
  const newUser = new User({ email, password })
  await newUser.save()
  res.status(201).json({ message: 'User created successfully' })
})

// Логин пользователя
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body

  // Находим пользователя по email
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Проверяем, совпадает ли пароль
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Если логин успешен
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

// Запуск сервера
app.listen(5000, () => {
  console.log('Server running on port 5000')
})
