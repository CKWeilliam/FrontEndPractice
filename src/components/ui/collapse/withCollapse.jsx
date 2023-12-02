import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../button/index'

//Future work: the collapse button should be flexiable moving arround the area
export default function withCollapse(Component){
    return function CollapsedComponent(props){
        const { className, minHeight='30px', collapse=true} = props
        
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
            <div className='relative'>
                <div className={containerStyles + ' ' + className} style={{ minHeight:minHeight, overflow:`${isOverFlow ? 'hidden' : 'none'}` }}>
                    <div ref={contentRef} className={contentStyles} style={{ minHeight:minHeight, maxHeight: contentHeight }}>
                        <Component {...props} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
                    </div>
                </div>

                <div className='mt-4 flex center'>
                    <Button onClick={toggleCollapse} className="w-2/5" >
                        <p className='text-md uppercase'>{isCollapsed ? 'Expend' : 'Hide'} </p> 
                    </Button>
                </div>
            </div>
        )
    }
}
