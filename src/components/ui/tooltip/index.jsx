import React from 'react'

const ToolTip = ({children, text}) => {
    return (
        <div className='group relative h-full w-full flex center cursor-pointer'>
            {children}
            <div id={text} className='group-hover:opacity-100 transition-opacity z-15 bg-gray-500 text-gray-100 px-2 text-sm  rounded-md absolute left-1/2 -translate-x-1/2 -translate-y-[150%] opacity-0 m-4 mx-auto'>
                {text}
            </div>
        </div>
    )
}

export default ToolTip