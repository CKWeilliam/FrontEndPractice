import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMsal } from '@azure/msal-react'
import { useKBAuthentication } from '../../context/KBAuthenticationContext'
import { authApi } from '../../services'

const defaultItem = ({ value, label }) => (
    <div key={value} className="cursor-pointer px-4 py-4  hover:bg-gray-100 dark:hover:text-black">
        {label}
    </div>
)

const userOptions = [
    {
        name: 'Profile',
        href: 'profile'
    }
]
function UserDropdown({ title }) {
    const [isOpen, setIsOpen] = useState(false)
    const handleToggle = () => setIsOpen(!isOpen)
    const { instance } = useMsal()
    const { dispatch } = useKBAuthentication()
    const navigate = useNavigate()

    const logout = async () => {
        window.sessionStorage.removeItem('userInfo')
        try {
            await authApi.logout()
            if (import.meta.env.PROD) instance.logoutRedirect()
            dispatch({ type: 'LOGOUT' })
            window.sessionStorage.removeItem('userInfo')
            // window.location.href = '/'
            navigate('/')
        } catch (e) {
            console.log('has log out error', e)
        }
    }

    return (
        <div
            className="relative h-full w-full hover:cursor-pointer dark:text-black"
            onClick={handleToggle}
            // onPointerEnter={() => setIsOpen(true)}
            // onPointerLeave={() => setIsOpen(false)}
        >
            {/* <div className="flex cursor-pointer items-center justify-between bg-gray-200 px-2" onClick={handleToggle}> */}
            <div className="center flex h-full w-full dark:text-white">
                <span>
                    {/* {isOpen ? title + '▲' : title + ' ▼'} */}
                    {title}
                </span>
                <span className="bx bx-user"></span>
            </div>

            {isOpen && (
                <div className="top-15 absolute  z-10 w-full border-2 bg-white" onPointerOver={() => setIsOpen(true)}>
                    {userOptions.map((option) => (
                        <div
                            key={option.label}
                            className=" cursor-pointer px-4 py-4 text-center hover:bg-gray-200 dark:hover:text-black"
                        >
                            <Link to={option.href}>{option.name}</Link>
                        </div>
                    ))}
                    <button
                        className=" h-full w-full cursor-pointer px-4 py-4 hover:bg-gray-200 dark:hover:text-black"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

function TopNav({ toggle }) {
    const { state } = useKBAuthentication()

    const [darkMode, setDarkMode] = useState(JSON.parse(window.localStorage.getItem('dark-mode')) || false)

    if (darkMode) {
        document.getElementById('root').classList.add('dark')
    } else {
        document.getElementById('root').classList.remove('dark')
    }

    const onThemeChange = () => {
        window.localStorage.setItem('dark-mode', !darkMode)
        setDarkMode((prev) => !prev)
    }

    return (
        <nav className="nav bg-white dark:bg-kb8">
            <button
                className="center m-2 flex rounded hover:shadow-lg active:bg-gray-200"
                onClick={() => toggle((prev) => !prev)}
            >
                <span className="bx bx-menu bx-md" />
            </button>
            <div className="logo dark:logo-dark">
                <Link href="./">SSKB</Link>
            </div>
            <div className=" center relative flex w-full flex-auto gap-2 dark:bg-kb8 bg-white"></div>
            <div className="center flex w-[150px] dark:bg-kb8">
                <UserDropdown title={state.userInfo.name} options={['Profile', 'Logout']} />
            </div>
            <div className="center flex w-[60px] dark:bg-kb8">
                <button className="hover:animate-pulse" onClick={onThemeChange}>
                    <span className={`bx bx-sun bx-md ${darkMode ? 'text-white' : 'text-gray-900'}`}></span>
                </button>
            </div>
        </nav>
    )
}

export default TopNav
