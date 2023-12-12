import React, { useState, useEffect } from 'react'
import { default as Input, SelectInput, TextArea } from '../../../../components/ui/input'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import { MarkData } from './MarkFile'
import { SelectOptionsList } from './SelectOptionList'
import { PaginationItem } from '@mui/material'
// import { GetSearchThirdPartyPackage } from '../../../../services/thirdPartyPackage'
import { Loading } from '../../../../components/ui'



const SearchSbomForm = () => {
    const [ formData, setFormData ] = useState({
        partNumber: '',
        partType: '',
        fileCategory: '',
        fileName:''
    })
    const [ showResult, setShowResult ] = useState(false)
    const [ resultCount, setResultCount ] = useState(0)
    const [ searchResultList, setSearchResultList ] =useState([])
    const [ isLoading , setIsLoading ] = useState(false)

    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        setResultCount(searchResultList.length)
        console.log('Result count updated:', resultCount)
        console.log('formData updated:', formData)
    }, [formData, isLoading])


    const handleSearchResult = async (searchData) => {
        setIsLoading(true)
        // If the backend has changed the Body's key, modify it here.
        const keyMapping = {
            'partNumber': 'part_no',
            'partType': 'part_type',
            'fileCategory': 'file_category',
            'fileName': 'file_name'
        }
          
        // map searchData key names to jsonDataForSearch key names
        const jsonDataForSearch = Object.keys(searchData).reduce((acc, key) => {
            const newKey = keyMapping[key] || key
            acc[newKey] = searchData[key]
            return acc
        }, {})
        

        try {
            console.log(JSON.stringify('傳入格式 :', jsonDataForSearch))
            // Search data from API
            // const searchResult = await GetSearchThirdPartyPackage(jsonDataForSearch)
            // setSearchResultList(searchResult.data)
            // console.log('searchResultList', searchResultList)
            setSearchResultList(MarkData)

        } catch (error) {
            console.log('Failing post')
        } finally {
            setIsLoading(false)
            setShowResult(true)
        }

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
            <SearchBar onSearch = {handleSearchResult} setFormData={setFormData} formData={formData} setShowResult={setShowResult} setSearchResultList={setSearchResultList}/>
            <div className='w-full flex gap-4 h-8'>
                <p>Founded result:{resultCount}</p>
            </div>
            {isLoading ? <Loading /> : (
                showResult && <SearchResult 
                setResultCount={setResultCount} 
                    // Input data from API to SearchResult
                    resultData={searchResultList} 
                />
            )}
            
        </div>
    )
}

export default SearchSbomForm