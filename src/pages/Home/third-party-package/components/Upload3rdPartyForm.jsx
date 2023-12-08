import React, { useState, useEffect } from 'react'
// import { AddThirdPartyPackage } from '../../../../services/thirdPartyPackage'
import { default as Input, SelectInput, TextArea } from '../../../../components/ui/input'
import { SelectOptionsList } from './SelectOptionList'
import { Loading } from '../../../../components/ui'
// import { useAlert } from '../../../../hooks'
// import { useKBQuery } from '../../../../hooks'

const UploadForm = () => {
    const formDataForUpload = new FormData()
    // const { Alert } = useAlert()
    const [isLoading , setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        partNumber: '',
        partType: '',
        fileCategory: '',
        files:[],
        //If you need to display a single line on the uploaded file, the settings are as below.
        // files: [{ file: null, fileVersion: '' }],
    })



    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleFileChange = (e, index) => {
        const files = [...formData.files]
        files[index] = {
            file: e.target.files[0],
            fileVersion: files[index] ? files[index].fileVersion : '',
        }
        setFormData({
            ...formData,
            files,
        })
    }

    const handleFileVersionChange = (e, index) => {
        const files = [...formData.files]
        files[index] = {
            file: files[index] ? files[index].file : null,
            fileVersion: e.target.value,
        }
        setFormData({
            ...formData,
            files,
        })
    }

    const handleAddFile = () => {
        if (formData.files.length < 5) {
            setFormData({
                ...formData,
                files: [...formData.files, { file: null, fileVersion: '' }],
            })

        }
    }

    const handleRemoveFile = (index) => {
        const files = [...formData.files]
        files.splice(index, 1)
        setFormData({
            ...formData,
            files,
        })
    }

    console.log('1 :', isLoading)

    useEffect(() =>{
        if (formDataForUpload && formDataForUpload.getAll('System_SBOMS_Upload').length > 0) {
            handleUpload()
        }
    }
    ,[formDataForUpload, isLoading])

    // console.log(JSON.stringify(formData))
    const handleUpload = async (e) => {  

        // e.preventDefault()
        setIsLoading(true)
        console.log('2 :', isLoading)
        // console.log(JSON.stringify(formData))
        
        formDataForUpload.append('part_no', formData.partNumber)
        formDataForUpload.append('part_type', formData.partType)
        formDataForUpload.append('file_category', formData.fileCategory)
        formDataForUpload.append('uploaded_dt', new Date().toISOString())

        formData.files.forEach((fileObject, index) => {
            formDataForUpload.append('System_SBOMS_Upload', fileObject.file)
            formDataForUpload.append(`file_versions[${index}]`, fileObject.fileVersion)
        })

        //For Testing without API 
        console.log(formDataForUpload)
        setIsLoading(false)
        setFormData({
                    partNumber: '',
                    partType: '',
                    fileCategory: '',
                    files: [],
                })

        //Post API function
        // try {
        //     const result = await AddThirdPartyPackage(formDataForUpload)
        //     console.log('statusCode:', result.success)
        //     if (result.success){
        //         Alert('success', 'Upload File Success.')
        //     }else{
        //         Alert('danger', 'Upload File Error.')
        //     }
            
        //     setFormData({
        //         partNumber: '',
        //         partType: '',
        //         fileCategory: '',
        //         files: [],
        //     })
        // } catch (error) {
        //     console.log('Failing post')
        //     Alert('danger', 'Upload File Error.')
        // } finally {
        //     setIsLoading(false)
        // }
    }


        
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
            <div >
                <div >
                    <div className='flex justify-center p-[0.5em] border-b-2'>
                        <label className='w-32 flex p-[.5em]'>Part No. </label>
                        <Input
                            name="partNumber"
                            value={formData.partNumber}
                            required={true}
                            onChange={handleInputChange} />
                        <br />
                    </div>
                    <div className="flex justify-center p-[0.5em]">
                        <label className='w-32 flex p-[.5em]'>Part Type</label>
                        <SelectInput
                            className='flex-1'
                            value={formData.partType}
                            name="partType"
                            defaultValue={SelectOptionsList['partType'][0]}
                            onChange={handleInputChange}
                            options={SelectOptionsList['partType']}
                        />
                        <label className='w-32 flex p-[.5em]'>File Category</label>
                        <SelectInput
                            className='flex-1'
                            value={formData.fileCategory}
                            name="fileCategory"
                            defaultValue={SelectOptionsList['fileCategory'][0]}
                            onChange={handleInputChange}
                            options={SelectOptionsList['fileCategory']}
                        />
                    </div>
                    <div className='flex items-center p-[0.5em] flex-row border-4' >
                        <label className='w-1/2 flex p-[.5em]'>Upload Files</label>
                        <label className='w-1/4 flex p-[.5em]'>File Version</label>
                        <div className='w-1/4'>
                            <button type="button" onClick={handleAddFile} className='button button-success h-8'>Add File</button>
                        </div>
                    </div>
                    <div>
                        {formData.files.map((fileObject, index) => (
                            <div key={index} className="grid grid-cols-4 items-center p-[0.5em] gap-[0em] border-2">
                                <input type="file" name={`file${index + 1}`} onChange={(e) => handleFileChange(e, index)} className="col-span-2 w-full" />
                                {/* {fileObject.file && <p> {fileObject.file.name}</p>} */}
                                <Input
                                    className="col-span-1 w-full"
                                    name={`fileVersion${index + 1}`}
                                    value={fileObject.fileVersion}
                                    onChange={(e) => handleFileVersionChange(e, index)}
                                    placeholder="File Version"
                                />
                                <div key={index} className='w-full '>
                                    <button type="button" onClick={() => handleRemoveFile(index)} className="col-span-1 button button-danger h-8">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleUpload} type="button" className="button button-primary h-8 border-0 m-3 p-[.5em] pr-[1em] pb-[.5em] pl-[1em]" >Upload</button>
                </div>

            </div>
            )}
        </div>
    )
}

export default UploadForm