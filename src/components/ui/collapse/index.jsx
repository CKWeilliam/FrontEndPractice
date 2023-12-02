// import classNames from 'classnames'
// import React, { forwardRef, useEffect, useRef, useState } from 'react'
// // The css anmitaion is not supporting percitentate/auto value when transititioning. Since it may case performance issues.
// // On another way, the client height is not detectable while the content height is hidding.
// // However, setting the height to auto, for fixing the content to its max height, the max-height can be use to set transistion animation.

// const Collapse = ({ title, children, className }) => {
//     const [isCollapsed, setIsCollapsed] = useState(true)
//     const [contentHeight, setContentHeight] = useState(0)
//     const contentRef = useRef(null)

//     useEffect(() => {
//         setContentHeight(isCollapsed ? 0 : contentRef.current.scrollHeight)
//     }, [isCollapsed])

//     const toggleCollapse = () => {
//         setIsCollapsed(!isCollapsed)
//     }

//     const containerStyles = classNames('relative rounded-sm border border-gray-400 ', {
//         'h-auto': !isCollapsed
//     })

//     const contentStyles = classNames('transition-all duration-300 px-4', {
//         'max-h-0 overflow-hidden': isCollapsed,
//         'max-h-[1000px]': !isCollapsed,
//         'opacity-0': isCollapsed,
//         'opacity-100': !isCollapsed
//     })

//     return (
//         <div className={containerStyles + ' ' + className}>
//             <div className="flex h-10 cursor-pointer items-center justify-between p-2" onClick={() =>  toggleCollapse()}>
//                 <h3 className="text-md">{title || 'Collapse'}</h3>
//                 <svg
//                     className={`h-4 w-4 transition-transform ${isCollapsed ? '' : 'rotate-180 transform'}`}
//                     viewBox="0 0 24 24"
//                 >
//                     <path fill="currentColor" d="M7 10l5 5 5-5z" />
//                 </svg>
//             </div>

//             <div ref={contentRef} className={contentStyles} style={{ maxHeight: contentHeight }}>
//                 {children}
//             </div>
//         </div>
//     )
// }

// const ControlledCollapse = forwardRef((props, ref) => {
//     const [isCollapsed, setIsCollapsed] = useState()

// })

// ControlledCollapse.displayName = 'ControlledCollapse'
// Collapse.Controlled = ControlledCollapse

// export default Collapse
