import { useMsal } from '@azure/msal-react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HomeIcon from '@mui/icons-material/Home'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../assets/img/supermicro.png'
import { useKBAuthentication } from '../../../context/KBAuthenticationContext'
import { authApi } from '../../../services/index'
import './sidebar.css'

const getProdSidebarItems = (roleScore) => {
    let basicItems = [
        {
            name: 'Home',
            href: '/',
            icon: <HomeIcon className="text-white" />
        }
    ]

    if (roleScore >= 2) {
        basicItems.push({
            name: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon className="text-white" />,
            children: [
                {
                    name: 'Support Issue',
                    href: '/support-issues/edit',
                    icon: 'bx bxs-edit-alt'
                },
                {
                    name: 'SBOM',
                    href: '/dashboard/sbom',
                    icon: 'bx bx-search-alt'
                },
                {
                    name: 'Scan Issues',
                    href: '/dashboard/scan-issues',
                    icon: 'bx bx-search-alt'
                }
                // {
                //     name: 'Qemu',
                //     href: '/dashboard/qemu',
                //     icon: 'bx bx-terminal'
                // }
            ]
        })
    }

    if (roleScore >= 3) {
        basicItems = basicItems.map((item) => {
            if (item.name === 'Dashboard') {
                item.children.push({
                    name: 'Admin',
                    href: '/dashboard',
                    icon: 'bx bxs-wrench'
                })
            }
            return item
        })
    }

    return basicItems
}

const getDevbSidebarItems = (roleScore) => {
    let basicItems = [
        {
            name: 'Home',
            href: '/',
            icon: <HomeIcon className="text-white" />
        }
    ]

    if (roleScore >= 2) {
        basicItems.push({
            name: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardIcon className="text-white" />,
            children: [
                {
                    name: 'Support Issue',
                    href: '/support-issues/edit',
                    icon: 'bx bxs-edit-alt'
                },
                {
                    name: 'SBOM Search',
                    href: '/dashboard/sbom',
                    icon: 'bx bx-search-alt'
                },
                {
                    name: 'Scan Issues',
                    href: '/dashboard/scan-issues',
                    icon: 'bx bx-scan'
                },
                {
                    name: 'Qemu',
                    href: '/dashboard/qemu',
                    icon: 'bx bx-terminal'
                }
            ]
        })
    }

    if (roleScore >= 3) {
        basicItems = basicItems.map((item) => {
            if (item.name === 'Dashboard') {
                item.children.push({
                    name: 'Admin',
                    href: '/dashboard',
                    icon: 'bx bxs-wrench'
                })
            }
            return item
        })
    }

    return basicItems
}

/**
 * The side bar items to show base on user role defined in array form.
 * The basic should have:
 *  name: the name text will show at sidebar
 *  herf: the herf will apply to the link
 *  icon: the icon will show before the name text
 *  childern: if the link has childern, its sub links will defined here
 *  *notes: for multiple layers sideber (> 2), there may have logical error in the render function. Haven't test yet.
 * @param {string} role the user role from KBAuthentication Context
 * @returns
 */
const sidebaritems = (role) => {
    let roleScore = 0
    if (role === 'operator') roleScore = 2
    else if (role === 'admin') roleScore = 3

    if (!import.meta.env.PROD) {
        return getDevbSidebarItems(roleScore)
    } else return getProdSidebarItems(roleScore)
}

/**
 * The SibeBar component
 * @returns
 */
const SideBar = () => {
    const { dispatch, role } = useKBAuthentication()
    const location = useLocation()
    const navigate = useNavigate()
    const collapseRef = useRef(true)
    const { instance } = useMsal()
    const storedStatus = JSON.parse(sessionStorage.getItem('menuCollapseStatus')) || {}
    const [itemCollapseStatus, setCollapse] = useState(storedStatus)

    const sidebarCollapse = () => {
        if (collapseRef.current) {
            document.getElementById('main').style.marginLeft = '50px'
            document.getElementById('kb-sidebar').classList.toggle('collapse')
            document.getElementById('collapse-btn').classList.toggle('close')
            window.localStorage.setItem('sidebar-collapse', 'true')
        } else {
            document.getElementById('main').style.marginLeft = '210px'
            document.getElementById('kb-sidebar').classList.toggle('collapse')
            document.getElementById('collapse-btn').classList.toggle('close')
            window.localStorage.setItem('sidebar-collapse', 'false')
        }
        collapseRef.current = !collapseRef.current
    }

    const Logout = async () => {
        window.sessionStorage.removeItem('userInfo')
        try {
            await authApi.logout()
            if (import.meta.env.PROD) instance.logoutRedirect()
            dispatch({ type: 'LOGOUT' })
            window.sessionStorage.removeItem('userInfo')
        } catch (e) {
            console.log('has log out error', e)
        }
        // navigate('/logout');
    }

    const handleMenuClick = (href, collapseIndex) => {
        if (collapseIndex) {
            const newStatus = { ...itemCollapseStatus, [collapseIndex]: !itemCollapseStatus[collapseIndex] }
            sessionStorage.setItem('menuCollapseStatus', JSON.stringify(newStatus))
            setCollapse(newStatus)
        }
        if (href) {
            if (href === location.pathname) navigate(0)
            else navigate(href)
        }
    }
    const renderSideBarItem = () =>
        sidebaritems(role).map((item, index) => {
            if (item.children?.length > 0) {
                return (
                    <div key={index + item.name + 'list'}>
                        <ListItemButton
                            onClick={() => {
                                if (!collapseRef.current) sidebarCollapse()
                                handleMenuClick(null, item.name)
                            }}
                            sx={{
                                ':hover': {
                                    bgcolor: 'white',
                                    color: 'black'
                                }
                            }}
                        >
                            <i className="bx bx-desktop pl-1 pr-6" />
                            <ListItemText primary={item.name} />
                            {itemCollapseStatus[item.name] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={itemCollapseStatus[item.name]} timeout="auto" unmountOnExit>
                            <List
                                className=" text-white"
                                component="nav"
                                sx={{
                                    paddingLeft: 3
                                }}
                            >
                                {item.children.map((child) => {
                                    return (
                                        <ListItemButton
                                            key={child.name}
                                            onClick={() => handleMenuClick(child.href)}
                                            className="sidebar-item w-full text-left"
                                            sx={{
                                                '&:hover': {
                                                    bgcolor: 'white'
                                                }
                                            }}
                                        >
                                            <i className={child.icon} />
                                            <ListItemText primary={child.name} />
                                        </ListItemButton>
                                    )
                                })}
                            </List>
                        </Collapse>
                    </div>
                )
            }
            if (item.name === 'Home') {
                return (
                    <NavLink
                        key={item.name + 'list'}
                        to={item.href}
                        className=""
                        onClick={() => handleMenuClick(item.href)}
                    >
                        <div className="sidebar-item w-full text-left">
                            <i className="bx bxs-home" />
                            Home
                        </div>
                    </NavLink>
                )
            }
            return (
                <ListItemButton key={item.name + 'list'} onClick={() => handleMenuClick(item.href)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItemButton>
            )
        })

    useLayoutEffect(() => {
        if (window.localStorage.getItem('sidebar-collapse') === 'true') {
            document.getElementById('main').style.marginLeft = '50px'
            document.getElementById('kb-sidebar').classList.add('collapse')
            document.getElementById('collapse-btn').classList.add('close')
            collapseRef.current = false
        }
    }, [])

    const [dark, setDark] = useState(false)
    function toggleTheme() {
        setDark((prev) => !prev)
        document.getElementById('root').classList.toggle('dark')
    }

    return (
        <div id="kb-sidebar" className="sidebar">
            <button id="collapse-btn" className="collapse-btn" onClick={sidebarCollapse}>
                <i className="bx bx-arrow-to-left bx-sm" />
            </button>
            <div className="relative mb-8 flex items-center text-xs">
                <img src={logo} alt="supermicro" className="ml-[50px] max-w-[80px]" />
                <span name="logo-name" className="ml-2 whitespace-nowrap text-lg text-white">
                    SSKB
                </span>
            </div>

            <div className="sidebar-items h-[85%]">
                <Link to="/" className="sidebar-item cursor-pointer">
                    <div className="w-full text-left">
                        <i className="bx bxs-home" />
                        Home
                    </div>
                </Link>
                <Link to="/support-issue" className="sidebar-item cursor-pointer">
                    <div className="w-full text-left">
                        <i className="bx bxs-edit-alt" />
                        Support Issue
                    </div>
                </Link>
                <Link to="/system-sbom" className="sidebar-item cursor-pointer">
                    <div className="w-full text-left">
                        <i className="bx bxs-search" />
                        System SBOM
                    </div>
                </Link>
                <Link to="/third-party-package " className="sidebar-item cursor-pointer">
                    <div className="w-full text-left">
                        <i className="bx bxs-search" />
                        Third Party Package
                    </div>
                </Link>
                {/* <List component="nav" className="uppercase text-white">
                    {renderSideBarItem()}
                </List> */}
                <div className="w-full flex-auto text-white"></div>
                {['admin', 'operator'].includes(role) && (
                    <Link to="/dashboard" className="sidebar-item cursor-pointer">
                        <div className="w-full text-left">
                            <i className="bx bxs-wrench" />
                            Dashboard
                        </div>
                    </Link>
                )}
                <Link to="/profile" className="sidebar-item cursor-pointer">
                    <div className=" w-full text-left">
                        <i className="bx bxs-user" />
                        Profile
                    </div>
                </Link>
                <Link to="/report" className="sidebar-item cursor-pointer">
                    <div className="w-full text-left">
                        <i className="bx bxs-message-rounded-error" />
                        Report
                    </div>
                </Link>
                {/* {!import.meta.env.PROD && (
                    <div className="sidebar-item cursor-pointer">
                        <button className=" w-full text-left" onClick={toggleTheme}>
                            {dark ? (
                                <>
                                    <i className="bx bx-sun" />
                                    <span>Dark Theme</span>
                                </>
                            ) : (
                                <>
                                    <i className="bx bxs-sun" />
                                    <span>Light Theme</span>
                                </>
                            )}
                        </button>
                    </div>
                )} */}
                <div className="sidebar-item">
                    <button type="button" onClick={Logout} className="w-full text-left">
                        <i className="bx bx-log-out" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
