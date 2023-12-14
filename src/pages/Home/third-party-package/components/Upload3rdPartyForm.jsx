import React, { useState, useEffect } from 'react'
// import { AddThirdPartyPackage } from '../../../../services/thirdPartyPackage'
import { default as Input, SelectInput, TextArea } from '../../../../components/ui/input'
import { SelectOptionsList } from './SelectOptionList'
import { Loading } from '../../../../components/ui'
// import { useAlert } from '../../../../hooks'
// import { useKBQuery } from '../../../../hooks' 
import Alert from './uploadStatus/Alert';
import Card from './uploadStatus/Card';
import { fireEvent } from '@testing-library/react';

const UploadForm = () => {
    const formDataForUpload = new FormData();
    const [isLoading, setIsLoading] = useState(false);
    const [isShow, setShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const [uploadHistory, setUploadHistory] = useState([]);
    const [isShowHistory, setIsShowHistory] = useState(false);
    const [formData, setFormData] = useState({
        partNumber: '',
        partType: '',
        fileCategory: '',
        files: [],
        //If you need to display a single line on the uploaded file, the settings are as below.
        // files: [{ file: null, fileVersion: '' }],
    })

    useEffect(() => {
        console.log('isLoading has changed:', isLoading);
    }, [isLoading]);

    useEffect(() => {
        console.log('formData has changed:', formData);
    }, [formData]);


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

    // useEffect(() => {
    //     if (formDataForUpload && formDataForUpload.getAll('System_SBOMS_Upload').length > 0) {
    //         handleUpload()
    //     }
    // }, [formDataForUpload, isLoading])

    // console.log(JSON.stringify(formData))

    /**
     * 驗證欄位資料
     * 
     * @returns 
     * 
     */
    const validateFormData = () => {
        let errorMessages = [];

        if (!formData.partNumber || formData.partNumber.length > 260) {
            errorMessages.push('Part No. is required and must be less than 260 characters.');
        }

        if (!formData.partType) {
            errorMessages.push('Part Type is required.');
        }

        if (!formData.fileCategory) {
            errorMessages.push('File Category is required.');
        }

        for (let file of formData.files) {
            if (!file.file) {
                errorMessages.push('All files must be selected.');
            }
            if (!file.fileVersion.match(/^[0-9]*\.?[0-9]+$/)) {
                errorMessages.push('File Version must be a positive number, float, string or zero, and cannot contain special characters.');
            }
        }

        setErrors(errorMessages);
        return errorMessages.length === 0;
    };

    /**
     * 模擬loading畫面
     */
    const simulateLoading = () => {
        setTimeout(() => {
            setIsLoading(false);
            setIsShowHistory(true);
        }, 1000); // 3秒後設置isLoading為false 
    };

    const handleUpload = () => {

        if (!validateFormData()) {
            return;
        }

        // e.preventDefault()
        setIsLoading(true);
        simulateLoading(); // 模擬上傳資料秒數 3秒

        formDataForUpload.append('part_no', formData.partNumber)
        formDataForUpload.append('part_type', formData.partType)
        formDataForUpload.append('file_category', formData.fileCategory)
        formDataForUpload.append('uploaded_dt', new Date().toISOString())

        formData.files.forEach((fileObject, index) => {
            formDataForUpload.append('System_SBOMS_Upload', fileObject.file)
            formDataForUpload.append(`file_versions[${index}]`, fileObject.fileVersion)
        })

        //For Testing without API 
        console.log('formDataForUpload:', formDataForUpload);
        console.log('formData:', formData);

        // setIsLoading(false);
        setFormData({
            partNumber: '',
            partType: '',
            fileCategory: '',
            files: [],
        })

        setShow(true);

        let newHistoryEntry = {
            timestamp: new Date().toLocaleString(),
            partNumber: formData.partNumber,
            partType: formData.partType,
            fileCategory: formData.fileCategory,
            files: formData.files.map(file => ({
                name: file.file.name,
                version: file.fileVersion
            }))
        };

        // console.log('newHistoryEntry:', newHistoryEntry);
        setUploadHistory([...uploadHistory, newHistoryEntry]);


        //Post API function
        // try {
        //     const result = await AddThirdPartyPackage(formDataForUpload)
        //     console.log('statusCode:', result.success)
        //     if (!result.success) {
        //         <Alert variant={'filled'} type={'error'} alertText={'This is a error alert !!!'} />
        //         return;
        //     } 
        //     retrun (< Alert variant = { 'filled'} type = { 'success'} alertText = { 'This is a success alert !!!'} />)
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
                        <div className='flex justify-center items-center p-[0.5em] border-b-2'>
                            <label className='w-36 flex p-[.5em]'>Part No. </label>
                            <Input
                                className='flex-1'
                                name="partNumber"
                                value={formData.partNumber}
                                required={true}
                                onChange={handleInputChange} />
                            {/* <br /> */}
                        </div>
                        <div className="flex justify-center items-center p-[0.5em] border-b-2">
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
                            <label className='w-1/4 flex p-[.5em] text-align'>Upload Files</label>
                            <label className='w-1/4 flex p-[.5em] text-align'>File Name</label>
                            <label className='w-1/4 flex p-[.5em] text-align'>File Version</label>
                            <div className='w-1/4 flex text-align'>
                                <button type="button" onClick={handleAddFile} className='button button-success h-8'>Add File</button>
                            </div>
                        </div>
                        <div>
                            {formData.files.map((fileObject, index) => (
                                <div key={index} className="grid grid-cols-4 items-center p-[0.5em] gap-[0em] border-2">
                                    <input type="file" id={`file-input-${index}`} name={`file${index + 1}`} onChange={(e) => handleFileChange(e, index)} style={{ display: 'none' }} className="col-span-2 w-full" />

                                    <label htmlFor={`file-input-${index}`} className="col-span-1 w-full button button-primary text-align large-text">
                                        {fileObject.name || '選擇檔案'}
                                    </label>

                                    <div >
                                        {fileObject.file && <p className='flex text-align'> {fileObject.file.name}</p>}
                                    </div>

                                    <Input
                                        className="col-span-1 w-full"
                                        name={`fileVersion${index + 1}`}
                                        value={fileObject.fileVersion}
                                        onChange={(e) => handleFileVersionChange(e, index)}
                                        placeholder="File Version"
                                    />
                                    <div key={index} className='w-full flex text-align'>
                                        <button type="button" onClick={() => handleRemoveFile(index)} className="col-span-1 button button-danger h-8">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {errors.map((error, index) => (
                                <Alert key={index} variant={'filled'} type={'error'} alertText={error} />
                            ))}
                        </div>
                        {isShow && <Alert variant={'filled'} type={'success'} alertText={'This is a success alert 1111234!!!'} />}
                        <button type="button" onClick={handleUpload} className="button button-primary h-8 border-0 m-3 p-[.5em] pr-[1em] pb-[.5em] pl-[1em]" >Upload</button>
                    </div>

                </div>
            )}

            {isShowHistory ? (
            <Card list={uploadHistory} />) : (
                null
            )}
        </div>


    )
}

export default UploadForm