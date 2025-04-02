import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import { Root } from './Root'

const container = document.getElementById('root')

createRoot(container).render(<Root />)
