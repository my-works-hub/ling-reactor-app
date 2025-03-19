import React, { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

const MainContext = createContext()

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <MainContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const useMainContext = () => {
  const context = useContext(MainContext)
  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider')
  }
  return context
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
