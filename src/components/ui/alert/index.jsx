// import React, { memo } from 'react'
// // import { useAlert } from '../../../hooks'
// import './alert.css'

// /***
//  * This is the module which used for showing alert box on bottom right.
//  * To control the alert, please use the Alert Context.
//  * Future enhancement:
//  *   1. Add more options for changing display position.
//  */
// const Alert = () => {
//     const { message, type, closeAlert } = useAlert()
    
//     return (
//         <div id="alert" className="kb-alert">
//             <div id="alert-border-1" className={`alert-${type}`} role="alert">
//                 <svg
//                     className="h-5 w-5 flex-shrink-0 bg-transparent"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                         clipRule="evenodd"
//                     ></path>
//                 </svg>
//                 <div className="ml-3 text-sm font-medium">{message}</div>
//                 <button
//                     type="button"
//                     onClick={closeAlert}
//                     className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-2xl p-1 text-blue-500 hover:bg-blue-200 focus:ring-blue-400  active:ring-1 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
//                 >
//                     x
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default  memo(Alert)
