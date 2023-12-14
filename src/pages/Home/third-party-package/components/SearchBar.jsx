import React, { useState } from 'react'
import { Input } from '../../../../components/ui'


const SearchBar = ({ onSearch, setFormData, formData, setShowResult, setSearchResultList }) => {

    const handleKeywordChange = (e) => {
        const value = e.target.value
        // setSearchKeywords(value)
        setFormData({
            ...formData,
            fileName: value,
        })
    }
    // handle API form data here
    const handleSearch = () => {
        onSearch(formData)
    }
    const handleClear = () =>(
        setShowResult(false),
        setSearchResultList([]),
        setFormData({
            partNumber: '',
            partType: '',
            fileCategory: '',
            fileName:''
        })
    )

    return (
        <div className='row items-center p-2'>
            <div className='w-full flex items-center gap-4'>
                <Input id='test' name='test' value={formData.fileName} onChange={handleKeywordChange}/>
                <button className='button button-primary h-8 large-text' onClick={handleSearch}>Search</button>
                <button className='button button-danger h-8 large-text' onClick={handleClear}>Clear</button>
                {/* <button className='button button-success h-8'>Download</button>
                <button className='button button-success h-8'>Switch</button> */}
            </div>

        </div>
    )
}

export default SearchBar