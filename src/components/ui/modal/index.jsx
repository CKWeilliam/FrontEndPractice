import React, { Children, forwardRef, useEffect, useState } from 'react'
import './model.css'

/**
 * This modal will be decrepted in future. Please use the Modal.js instead.
 * 
 * 
 * The modal component. Using forward ref to define and forward modal's self properities.
 * Eg: toggle, toggle status, etc.
 * Todo: modal.close(), modal.open() can be added in future
 */

const Modal = forwardRef(({ id, contentID, children, onOpenCallBack, onCloseCallBack }, ref) => {
    if (!id) throw new Error('No modal id can be ref!')

    const header = Children.map(children, (child) => (child.type.displayName === 'Header' ? child : null))
    const body = Children.map(children, (child) => (child.type.displayName === 'Body' ? child : null))
    const footer = Children.map(children, (child) => (child.type.displayName === 'Footer' ? child : null))

    const [status, setStatus] = useState(false)

    function toggleModal() {
        const CID = contentID || id + '-content'
        document.getElementById(id).classList.toggle('show')
        document.getElementById(CID).classList.toggle('show')
        setStatus((prev) => !prev)
    }

    function openModal() {
        const CID = contentID || id + '-content'
        document.getElementById(id).classList.add('show')
        document.getElementById(CID).classList.add('show')
        setStatus(true)
    }

    function closeModal() {
        const CID = contentID || id + '-content'
        document.getElementById(id).classList.remove('show')
        document.getElementById(CID).classList.remove('show')
        setStatus(false)
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
            ref.toggle = toggleModal
            ref.open = openModal
            ref.close = closeModal
            ref.status = status
        }

        const toggleModalByWindow = (e) => {
            if (e.target.id === id) toggleModal()
        }

        const closeModalOnKeydown = (e) => {
            if (e.code == 'Escape') {
                closeModal()
            }
        }

        window.addEventListener('mousedown', toggleModalByWindow)
        window.addEventListener('keydown', closeModalOnKeydown)

        return () => {
            window.removeEventListener('mousedown', toggleModalByWindow)
            window.removeEventListener('keydown', closeModalOnKeydown)
        }
    }, [])

    if (!id) throw new Error('The modal should have an unique id!')

    return (
        <div id={id} aria-hidden="true" className="modal" ref={ref}>
            <div id={contentID || id + '-content'} className="modal-content">
                <div className="relative h-full rounded-lg bg-white shadow overflow-hidden">
                    <div className="mx-4 flex min-h-16 items-center justify-between rounded-t border-b border-gray-200">
                        {header}
                        <button
                            type="button"
                            onClick={toggleModal}
                            className="items-cente ml-auto inline-flex rounded-2xl bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900"
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
                    {body}
                    {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Content
          </p> */}
                    {footer}
                </div>
            </div>
        </div>
    )
})

// Section where define all the Child Component
const Header = ({ children }) => <h3 className="text-start text-xl font-medium text-black">{children}</h3>

Header.displayName = 'Header'
Modal.Header = Header

const Body = ({ children, id }) => (
    <div id={id && id} className="relative h-[calc(100%-9rem)] w-full overflow-y-scroll text-base">
        {children}
    </div>
)

Body.displayName = 'Body'
Modal.Body = Body

const Footer = ({ children }) => (
    <div className="absolute bg-white w-full bottom-0 flex h-16 items-center justify-end space-x-2 rounded-b border-t border-gray-200">
        {children}
    </div>
)

Footer.displayName = 'Footer'
Modal.Footer = Footer

Modal.displayName = 'Modal'
export default Modal
