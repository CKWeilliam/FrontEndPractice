import React, { useState } from 'react'
import { Input } from '../../../components/ui'



const SearchBar = ({ onSearch, setSearchData, searchData, setShowResult, setSearchResultList }) => {

    const [searchKeywords, setSearchKeywords] = useState('')

    const handleKeywordChange = (e) => {
        const value = e.target.value
        // setSearchKeywords(value)
        setSearchData({
            ...searchData,
            fileName: value,
        })
    }
    // handle API form data here
    const handleSearch = () => {
        onSearch(searchData)
    }
    const handleClear = () =>(
        setShowResult(false),
        setSearchResultList([]),
        setSearchData({
            sutType: '',
            fileType: '',
            fileName: ''
        })
    )

    return (
        <div className='row items-center p-2'>
            <div className='w-full flex items-center gap-4'>
                <Input id='test' name='test' value={searchData.fileName} placeholder='Search FileName...' onChange={handleKeywordChange}/>
                <button className='button button-primary h-8' onClick={handleSearch}>Search</button>
                <button className='button button-danger h-8' onClick={handleClear}>Clear</button>
                {/* <button className='button button-success h-8'>Download</button>
                <button className='button button-success h-8'>Switch</button> */}
            </div>

        </div>
    )
}

export default SearchBar