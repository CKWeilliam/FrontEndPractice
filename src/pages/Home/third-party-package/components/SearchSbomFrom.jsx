import React, { useState, useEffect } from 'react'
import { default as Input, SelectInput, TextArea } from '../../../../components/ui/input'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import { MarkData } from './MarkFile'
import { SelectOptionsList } from './SelectOptionList'
import { PaginationItem } from '@mui/material'


const SearchSbomForm = () => {
    
    const [formData, setFormData] = useState({
        partNumber: '',
        partType: '',
        fileCategory: '',
    })
    const [showResult, setShowResult] = useState(false)
    const [resultCount, setResultCount ] = useState(0)

    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSearchResult = (searchData) => {
        // Post Search API here
        console.log(JSON.stringify(searchData))
        setShowResult(true)
    }


    return (
        <div> 
            <div className="m-4 border-b-2">
                <h1 className=" py-2 text-start text-2xl"></h1>
            </div>
            <div className="flex justify-center p-[0.5em] border-b-2">
                <label className='w-32 flex p-[.5em]'>Part No.</label>
                <Input
                    name="partNumber"
                    value={formData.partNumber}
                    required={true}
                    onChange={(e) => handleInputChange('partNumber',  e.target.value)}
                />
                <br />
            </div>
            <div className="flex justify-center p-[0.5em] border-b-2">
                <label className='w-32 flex p-[.5em]'>Part Type</label>
                <SelectInput
                    className='flex-1'
                    value={formData.partType}
                    name="partType"
                    defaultValue={SelectOptionsList['partType'][0]}
                    onChange={(e) => handleInputChange('partType',  e.target.value)}
                    options={SelectOptionsList['partType']}
                />
            </div>
            <div className="flex justify-center p-[0.5em] border-b-2">
                <label className='w-32 flex p-[.5em]'>File Category</label>
                <SelectInput
                    className='flex-1'
                    value={formData.fileCategory}
                    name="fileCategory"
                    defaultValue={SelectOptionsList['fileCategory'][0]}
                    onChange={(e) => handleInputChange('fileCategory',  e.target.value)}
                    options={SelectOptionsList['fileCategory']}
                />
            </div>
            <SearchBar onSearch = {handleSearchResult} clearSelectSearch = {setFormData} formData={formData}/>
            <div className='w-full flex gap-4 h-8'>
                <p>Founded result:{resultCount}</p>
            </div>
            {showResult && <SearchResult 
            // resultData={searchData} 
                count = {setResultCount} 
            />}
            
        </div>
    )
}

export default SearchSbomForm