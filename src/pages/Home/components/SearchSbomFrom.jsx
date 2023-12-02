import React, { useState } from 'react'
import { default as Input, SelectInput, TextArea } from '../../../components/ui/input'
import SearchBar from './SearchBar'

const selectOptions = {
    partType: ['Add-on Card', 'HD Backplane', 'Memory', 'Riser Card'],
    fileCategory:['Software', 'BOM', 'EEPROM', 'Other']
}

const SearchSbomForm = () => {

    const [formData, setFormData] = useState({

        partType:'',
        fileCategory:'',
    })
    const [searchResult, setSearchResult] = useState(null)

    const handleSearchResult = (keyword) => {
        setSearchResult(keyword)
        console.log(keyword)
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
                    // onChange={handleInputChange}
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
                    // onChange={handleInputChange}
                    options={selectOptions['fileCategory']}
                />
            </li>
            <SearchBar onSearch = {handleSearchResult}/>
            <></>
        </div>
    )
}

export default SearchSbomForm