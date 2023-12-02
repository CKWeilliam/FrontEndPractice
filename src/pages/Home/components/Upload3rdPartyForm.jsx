import React, { useState } from 'react'
// import { AddThirdPartyPackage } from '../../../services/sysytemSbom'
import { default as Input, SelectInput, TextArea } from '../../../components/ui/input'

const selectOptions = {
    partType: ['Add-on Card', 'HD Backplane', 'Memory', 'Riser Card'],
    fileCategory:['Software', 'BOM', 'EEPROM', 'Other']
}


const UploadForm = () => {

    const [formData, setFormData] = useState({
        partNumber: '',
        partType:'',
        fileCategory:'',
        files: [],
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
        setFormData({
            ...formData,
            files: [...formData.files, { file: null, fileVersion: '' }],
        })
    }

    const handleRemoveFile = (index) => {
        const files = [...formData.files]
        files.splice(index, 1)
        setFormData({
            ...formData,
            files,
        })
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify(formData))
        const formDataForUpload = new FormData()
        formDataForUpload.append('part_no', formData.partNumber)
        formDataForUpload.append('part_type', formData.partType)
        formDataForUpload.append('file_category', formData.fileCategory)
        formDataForUpload.append('uploaded_dt', new Date().toISOString())

        formData.files.forEach((fileObject, index) => {
            formDataForUpload.append('System_SBOMS_Upload', fileObject.file)
            formDataForUpload.append(`file_version[${index}]`, fileObject.fileVersion)
        })
        // const formData = new FormData()

        // 添加一般的表單數據
        // formData.append('part_no', '2023113001')
        // formData.append('part_type', 'ipmi')
        // formData.append('file_category', 'ipmi')

        // // 添加日期
        // formData.append('uploaded_dt', '2023-11-30T00:00:00.000Z')

        // // 添加文件信息
        // formData.append('file_name_1', 'test_file_113001.txt')
        // formData.append('file_version_1', '0')
        // formData.append('file_type_1', 'text/plain')

        // formData.append('file_name_2', 'test_file_113002.txt')
        // formData.append('file_version_2', '1')
        // formData.append('file_type_2', 'text/plain')
            
        console.log(formDataForUpload)
        for (const pair of formDataForUpload.entries()) {
            console.log(pair[0] + ', ' + pair[1])
        }


        // const result = await AddThirdPartyPackage(formDataForUpload)
        // console.log(result)
        // console.log(result.response.data.message)
    }
    return (
        <div>     
            <form onSubmit={handleUpload}>
                <div >
                    <li className='flex justify-center p-[0.5em] border-b-2'>
                        <label className='w-64 flex p-[.5em]'>Part No. </label>
                        <Input 
                            name="partNumber"  
                            value={formData.partNumber} 
                            onChange={handleInputChange} />
                        <br />
                    </li>
                    <li className="flex justify-center p-[0.5em] border-b-2">
                        <label className='w-64 flex p-[.5em]'>Part Type</label>
                        <SelectInput
                            className='flex-1'
                            value={formData.partType}
                            name="partType"
                            defaultValue={selectOptions['partType'][0]}
                            onChange={handleInputChange}
                            options={selectOptions['partType']}
                        />
                    </li>
                    <li className="flex justify-center p-[0.5em] border-b-2">
                        <label className='w-64 flex p-[.5em]'>File Category</label>
                        <SelectInput
                            className='flex-1'
                            value={formData.fileCategory}
                            name="fileCategory"
                            defaultValue={selectOptions['fileCategory'][0]}
                            onChange={handleInputChange}
                            options={selectOptions['fileCategory']}
                        />
                    </li>
                    <li className='flex items-center p-[0.5em] flex-row'>
                        <label className='w-64 flex p-[.5em]'>Upload Files</label>
                        {formData.files.map((fileObject, index) => (
                            <div key={index}>   
                                <div key={index} className="flex-2 p-[0.5em] w-64">
                                    <input type="file" name={`file${index + 1}`} onChange={(e) => handleFileChange(e, index)} />
                                    <input type="text" name={`fileVersion${index + 1}`} value={fileObject.fileVersion} onChange={(e) => handleFileVersionChange(e, index)} placeholder="File Version" />
                                </div>
                                <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
                            </div> 
                        ))}
                        <br />
                        <button type="button" onClick={handleAddFile}>Add File</button>
                    </li>
                    <button type="submit" className="bg-gray-500 text-white border-0 m-3 p-[.5em] pr-[1em] pb-[.5em] pl-[1em]" >upload</button>
                </div>

            </form>
        </div>   
    )
}

export default UploadForm