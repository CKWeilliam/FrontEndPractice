// import React, { useRef } from 'react'
// import { Modal } from '../../../components/ui'

// const About = () => {
//     const modalRef = useRef()

//     return (
//         <div>
//             <button
//                 id="popover-button"
//                 type="button"
//                 className="ml-4 flex h-6 w-6 items-center justify-center rounded border-2 border-gray-300  text-[20px] hover:bg-kb-main hover:text-white active:ring-2 active:ring-blue-500"
//                 onClick={() => {
//                     modalRef.toggle()
//                 }}
//             >
//                 <i className="bx bx-info-square text-[1.25rem]"></i>
//                 <div id="popover" className="relative inline-block">
//                     <div
//                         id="popover_content"
//                         className="invisible absolute w-20 -translate-y-2 translate-x-[10%] rounded-md border-2 bg-white px-2 text-xs opacity-0 transition-all"
//                     >
//                         About this page
//                     </div>
//                 </div>
//             </button>
//             <Modal ref={modalRef} id="about-modal">
//                 <Modal.Header>
//                     <p className="p-4">About this page</p>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className="mx-auto my-4 flex w-3/5 flex-col items-start justify-start">
//                         <p className="self-center text-center text-2xl font-medium">Welcome to SSKB.</p>
//                         <p className="my-4 self-center">This page is about.</p>
//                         <p className="text-justify">
//                             Example Text
//                         </p>
//                         <br />
//                         <p>The colored tags in the table are able to click and will filter the rows.</p>
//                         <br />
//                         <p>The meanings:</p>
//                         <div className="m-auto mt-4 flex flex-col items-start gap-4">
//                             {/* <p>
//                                 <span className="badge-green text-xs">product</span> : product name
//                             </p>
//                             <p>
//                                 <span className="badge-lime text-xs">version</span> : Product firmware version
//                             </p>
//                             <p>
//                                 <span className="badge-cyan text-xs">product type</span> : Product type
//                             </p>
//                             <p>
//                                 <span className="badge-yellow  text-xs">affected pkg</span> : Affected package name
//                             </p>
//                             <p>
//                                 <span className="badge-orange text-xs">pkg ver</span> : Affected package version
//                             </p> */}
//                         </div>
//                     </div>
//                 </Modal.Body>
//             </Modal>
//         </div>
//     )
// }

// export default About
