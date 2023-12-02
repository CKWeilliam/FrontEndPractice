import React from 'react'
import { Outlet } from 'react-router-dom'
import { Alert } from '../ui'
import SideBar from './sidebar'

const Layout = () => {
    return (
        <div id="main" className="main overflow-auto transition-[margin] duration-500">
            <SideBar />
            <div name="layout" className="relative h-[calc(100vh-8px)] max-h-screen sm:mx-2 md:mx-5 lg:mx-10">
                <Alert />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
