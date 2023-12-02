import React from 'react'


const Card = ({ title, children, id, className }) => {
    return (
        <div
            id={id && id}
            className={`min-h-[40px] w-full border-collapse rounded bg-white shadow-[0_1px_4px_0_rgba(0,0,0,.25)] dark:text-black ${className}`}
        >
            {title && (
                <div id="title" className="mb-1 flex min-h-[40px] items-center px-4 py-2 text-start text-lg font-bold">
                    {title}
                </div>
            )}
            {children}
        </div>
    )
}

const Body = ({ children }) => {
    return children
}

Card.Body = Body

export default Card
