import React, { useState, useEffect, useRef  } from 'react'
import { default as Input, SelectInput, TextArea } from '../../../components/ui/input'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import MarkData from './MarkFile'

const selectOptions = {
    partType: ['Add-on Card', 'HD Backplane', 'Memory', 'Riser Card'],
    fileCategory:['Software', 'BOM', 'EEPROM', 'Other']
}

const SearchSbomForm = () => {
    
    const [formData, setFormData] = useState({
        partType:'',
        fileCategory:'',
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
        // 在這裡處理搜索結果或執行其他必要的邏輯
        console.log(JSON.stringify(searchData))
        setShowResult(true)
    }


    return (
        <div> 
            <div className="m-4 border-b-2">
                <h1 className=" py-2 text-start text-2xl"></h1>
            </div>
            <li className="flex justify-center p-[0.5em] border-b-2">
                <label className='w-64 flex p-[.5em]'>Part Type</label>
                <SelectInput
                    className='flex-1'
                    // value={formData.partType}
                    name="partType"
                    defaultValue={selectOptions['partType'][0]}
                    onChange={(e) => handleInputChange('partType',  e.target.value)}
                    options={selectOptions['partType']}
                />
            </li>
            <li className="flex justify-center p-[0.5em] border-b-2">
                <label className='w-64 flex p-[.5em]'>File Category</label>
                <SelectInput
                    className='flex-1'
                    // value={formData.fileCategory}
                    name="fileCategory"
                    defaultValue={selectOptions['fileCategory'][0]}
                    onChange={(e) => handleInputChange('fileCategory',  e.target.value)}
                    options={selectOptions['fileCategory']}
                />
            </li>
            <SearchBar onSearch = {handleSearchResult} formData={formData}/>
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