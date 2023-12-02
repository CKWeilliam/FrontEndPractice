import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Alert } from '../ui'
import SideBar from './SideBar'
import TopNav from './TopNav'

function DashboardLayout() {
    const [isSideBarOpen, setSideBarOpen] = useState(false)
    return (
        <div
            id="main"
            className="text-black transition-all duration-500 ease-in-out bg-[#f2f2f2] dark:bg-kb8 dark:text-white"
        >
            <TopNav toggle={setSideBarOpen} />

            <SideBar isOpen={isSideBarOpen} />

            <div
                id="content"
                className="overflow-auto h-[calc(100vh-50px)]"
               
            >
                <Alert />
                <div  className={`relative  ${
                    isSideBarOpen ? 'mx-12' : 'ml-[calc(3rem+200px)] mr-12'
                } px-5  dark:bg-kb7 transition-all ease-in-out`}>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
