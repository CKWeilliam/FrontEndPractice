import React, { Children, forwardRef, useEffect, useState } from 'react'
// import ComponentPortal from '../../../features/ComponentPortal'
import './model.css'

const Modal = forwardRef((props, ref) => {
    const { id = 'modal', contentID, isShowed = false, onClose, children, onCloseCallBack, onOpenCallBack } = props

    const [status, setStatus] = useState(false)

    const contents = ['Header', 'Body', 'Footer']
    const header = Children.map(children, (child) => (child.type?.displayName === 'Header' ? child : null))
    const body = Children.map(children, (child) => (child.type?.displayName === 'Body' ? child : null))
    const footer = Children.map(children, (child) => (child.type?.displayName === 'Footer' ? child : null))
    const other = Children.map(children, (child) => (!contents.includes(child.type?.displayName) ? child : null))

    function toggle() {
        setStatus((prev) => !prev)
    }

    function open() {
        setStatus(true)
    }

    function close() {
        setStatus(false)
        if (onCloseCallBack && typeof onCloseCallBack === 'function') {
            onCloseCallBack()
        }
    }

    useEffect(() => {
        if (!status && onCloseCallBack) {
            onCloseCallBack()
        }

        if (status && onOpenCallBack) {
            onOpenCallBack()
        }
    }, [status])

    useEffect(() => {
        if (ref) {
            ref.toggle = toggle
            ref.open = open
            ref.close = close
            ref.status = status
        }

        const closeModalOnKeydown = (e) => {
            if (e.code == 'Escape') {
                close()
            }
        }

        window.addEventListener('keydown', closeModalOnKeydown)

        return () => {
            window.removeEventListener('keydown', closeModalOnKeydown)
        }
    }, [])

    return (
        // <ComponentPortal isShowed={status}>
            <div
                ref={ref}
                id={id}
                aria-hidden="true"
                className={`modal ${status ? 'show' : ''}`}
                onPointerDown={(e) => {
                    if (e.target.id === id) close()
                }}
            >
                <div id={contentID || id + '-content'} className={`modal-content ${status ? 'show' : null}`}>
                    <div className="relative h-full rounded-lg bg-white shadow">
                        <div className="mx-4 flex h-16 items-center justify-between rounded-t border-b-2 border-gray-500 p-2">
                            {header}
                            <button
                                type="button"
                                onClick={close}
                                className="ml-auto inline-flex items-center rounded-2xl bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Content
          </p> */}
                        {body}
                        {other}
                        {footer}
                    </div>
                </div>
            </div>
        // </ComponentPortal>
    )
})

// Section where define all the Child Component
const Header = ({ children }) => <h3 className="text-start text-xl font-medium text-black">{children}</h3>

Header.displayName = 'Header'
Modal.Header = Header

const Body = ({ children, id }) => (
    <div id={id && id} className="relative h-[calc(100%-8rem)] w-full overflow-y-auto pb-6 pt-2 text-base">
        {children}
    </div>
)

Body.displayName = 'Body'
Modal.Body = Body

const Footer = ({ children }) => (
    <div className="mx-4 flex h-16 items-center justify-end space-x-2 rounded-b border-t-2 border-gray-500 p-2">
        {children}
    </div>
)

Footer.displayName = 'Footer'
Modal.Footer = Footer

Modal.displayName = 'Modal'
export default Modal
