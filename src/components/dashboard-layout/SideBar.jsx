import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useKBAuthentication } from '../../context/KBAuthenticationContext'

const baseURL = '/exp/dashboard/'
const itemsList = [
    {
        name: 'Home',
        href: ''
    },
    {
        name: 'Edit Support Issue',
        href: 'support-issue-editing'
    },
    {
        name: 'SBOM',
        href: 'sbom'
    },
    {
        name: 'Scan Issue',
        href: 'scan-issue'
    },
    {
        name: 'QEMU',
        href: 'qemu'
    },
   
]

function SideBar({ isOpen }) {
    const location = useLocation()
    const {role} = useKBAuthentication()

    return (
        <div className={`sidebar2 ${isOpen ? '-translate-x-[100%]' : ''}`}>
            <div className="sidebar-menu2">
                {itemsList.map((item, index) => (
                    <Link
                        key={item.name}
                        className={`sidebar-item2 ${
                            location.pathname === baseURL + item.href ? 'sidebar-active2' : ''
                        } block`}
                        to={item.href}
                    >
                        {item.name} {item.icon && <span className={item.icon} />}
                    </Link>
                ))}
                {
                    role === 'admin' && 
                    <Link
                        className="sidebar-item2 block hover:bg-purple-500"
                        to="admin"
                    >
                    Admin
                    </Link>
                }
                <Link
                    className="sidebar-item2 block hover:bg-purple-500"
                    to="../../"
                >
                    Back  <span className='bx bx-arrow-back' />
                </Link>
            </div>
        </div>
    )
}

export default SideBar
