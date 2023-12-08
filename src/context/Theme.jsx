import React, { useState, useEffect } from 'react'

const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.them || 'light')
    const colorTheme = theme === 'dark' ? 'light' : 'dark'

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove(colorTheme)
        root.classList.add(theme)
        localStorage.setItem('tememe', theme)
    }, [theme, colorTheme])
    return [colorTheme, setTheme]
}

export default useTheme
