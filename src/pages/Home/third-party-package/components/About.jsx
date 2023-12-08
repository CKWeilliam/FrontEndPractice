import React, { useRef } from 'react'
import { Modal } from '../../../../components/ui'

const About = () => {
    const modalRef = useRef()

    return (
        <div>
            <button
                id="popover-button"
                type="button"
                className="ml-4 flex h-6 w-6 items-center justify-center rounded border-2 border-gray-300  text-[20px] hover:bg-kb-main hover:text-white active:ring-2 active:ring-blue-500"
                onClick={() => {
                    modalRef.toggle()
                }}
            >
                <i className="bx bx-info-square text-[1.25rem]"></i>
                <div id="popover" className="relative inline-block">
                    <div
                        id="popover_content"
                        className="invisible absolute w-20 -translate-y-2 translate-x-[10%] rounded-md border-2 bg-white px-2 text-xs opacity-0 transition-all"
                    >
                        About this page
                    </div>
                </div>
            </button>
            <Modal ref={modalRef} id="about-modal">
                <Modal.Header>
                    <p className="p-4">About this page</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-auto my-4 flex w-3/5 flex-col items-start justify-start">
                        <p className="self-center text-center text-2xl font-medium">Welcome to Third Party Package.</p>
                        <p className="my-4 self-center"></p>
                        <p className="text-justify">   
                        Third-Party Page uses for storing and searching related files which sources could be vendors providing or download from vendors websites.
                        For each third-party part has five limitation files could upload, please make sure to fill the file version correctly.
                        </p>
                        <br />
                        <p></p>
                        <br />
                        <p>The Button meanings:</p>
                        <div className="m-auto mt-4 flex flex-col items-start gap-4">
                            <p>
                                <span className="button button-success h-8">Add File</span> : Add extra file upload column.
                            </p>
                            <p>
                                <span className="button button-danger h-8">Clear</span> : Clear text area.
                            </p>
                            <p>
                                <span className="button button-primary h-8">Search</span> : Search file, the searching logic is using Google method to search.
                            </p>
                            <p>
                                <span className="button button-success h-8">Download</span> : Download the specific file in that column.
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default About
