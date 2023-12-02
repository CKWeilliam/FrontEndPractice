import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

const Accordion = ({children, className, minHeight='30px', collapse=true}) => {
    const [isCollapsed, setIsCollapsed] = useState(collapse)
    const [isOverFlow, setIsOverFlow] = useState(false)
    const [contentHeight, setContentHeight] = useState(0)
    const contentRef = useRef(null)

    useEffect(() => {
        setContentHeight(isCollapsed ? 0 : contentRef.current.scrollHeight)
        setIsOverFlow(!isCollapsed)

    }, [isCollapsed])

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    const containerStyles = classNames('relative rounded-sm transition-all duration-300', {
        'h-auto': !isCollapsed,
        'max-h-0 overflow-hidden': isCollapsed,
        'max-h-[3000px]': !isCollapsed, //given from 1000 to 3000 in case some content would possible be hiddened!!!
    })

    const contentStyles = classNames('transition-all duration-300 pt-4')

    return (
        <div className={containerStyles + ' ' + className} style={{ minHeight:minHeight, overflow:`${isOverFlow ? 'hidden' : 'none'}` }}>
            <div ref={contentRef} className={contentStyles} style={{ minHeight:minHeight, maxHeight: contentHeight }}>
                <div className="absolute top-0 right-0 w-full h-4 flex cursor-pointer justify-end items-center border" onClick={() =>  toggleCollapse()}>
                    {isCollapsed ?  'show': 'hide'}
                    <svg
                        className={`h-8 w-8 transition-transform ${isCollapsed ? '' : 'rotate-180 transform'}`}
                    >
                        <path fill="currentColor" d="M7 10l5 5 5-5z" />
                    </svg>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Accordion