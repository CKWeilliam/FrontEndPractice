import React, { useState } from 'react'
import { Input } from '../../../../components/ui'

const SearchBar = ({ onSearch, clearSelectSearch, formData  }) => {

    const [searchKeywords, setSearchKeywords] = useState('')

    const handleKeywordChange = (e) => {
        const value = e.target.value
        setSearchKeywords(value)
    }   
    // handle API form data here
    const handleSearch = () => {
        onSearch({
            partNumber: formData.partNumber,
            partType: formData.partType,
            fileCategory: formData.fileCategory,
            searchText: searchKeywords,
        })
    }
    const handleClear = (formData) =>(
        clearSelectSearch({
            partNumber: '',
            partType: '',
            fileCategory: '',
        }),
        setSearchKeywords('') 
    )


    return (
        <div className='row items-center p-2'>
            <div className='w-full flex items-center gap-4'>
                <Input id='test' name='test' value={searchKeywords} onChange={handleKeywordChange}/>
                <button className='button button-primary h-8' onClick={handleSearch}>Search</button>
                <button className='button button-danger h-8' onClick={handleClear}>Clear</button>
                {/* <button className='button button-success h-8'>Download</button>
                <button className='button button-success h-8'>Switch</button> */}
            </div>

        </div>
    )
}

export default SearchBar