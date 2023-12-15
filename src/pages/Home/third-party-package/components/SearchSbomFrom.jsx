import React, { useState, useEffect } from 'react'
import { default as Input, SelectInput, TextArea } from '../../../../components/ui/input'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import { MarkData } from './MarkFile'
import { SelectOptionsList } from './SelectOptionList'
import { PaginationItem } from '@mui/material'
// import { GetSearchThirdPartyPackage } from '../../../../services/thirdPartyPackage'
import { Loading } from '../../../../components/ui'
// import { useAlert } from '../../../../hooks'
import ContentAlert from './mui-component/ContentAlert'


const SearchSbomForm = () => {
    const [formData, setFormData] = useState({
        partNumber: '',
        partType: '',
        fileCategory: '',
        fileName: ''
    })
    // const { Alert } = useAlert()
    const [showResult, setShowResult] = useState(false)
    const [resultCount, setResultCount] = useState(0)
    const [searchResultList, setSearchResultList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])


    const [sortOrder, setSortOrder] = useState('asc') // 用來排序
    const [sortBy, setSortBy] = useState('id')   // 排序的條件

    /**
     *  排序方法
     * @param {} results 
     * @returns 
     */
    const sortResults = (results) => {
        return results.sort((a, b) => {
            let aValue = a[sortBy]
            let bValue = b[sortBy]

            if (!isNaN(aValue) && !isNaN(bValue)) { // 判斷是否為數字
                aValue = +aValue
                bValue = +bValue
            }

            if (sortOrder === 'asc') {
                if (aValue < bValue) return -1
                if (aValue > bValue) return 1
                return 0
            } else { // 'desc'
                if (aValue > bValue) return -1
                if (aValue < bValue) return 1
                return 0
            }
        })
    }


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

    /**
     * 偵測當排序條件與順序發生變動時 呼叫排序方法
     */
    useEffect(() => {
        if (searchResultList.length > 0) {
            setSearchResultList(sortResults([...searchResultList]))
        }
    }, [sortBy, sortOrder])

    /**
         * 模擬loading畫面
         */
    const simulateLoading = () => {
        setTimeout(() => {
            setIsLoading(false)
            setShowResult(true)
        }, 1000) // 3秒後設置isLoading為false 
    }

    const validateFormData = () => {
        let errorMessages = []

        if (!formData.partType) {
            errorMessages.push('Part Type is required.')
        }

        if (!formData.fileCategory) {
            errorMessages.push('File Category is required.')
        }

        setErrors(errorMessages)
        return errorMessages.length === 0
    }

    const handleSearchResult = async (searchData) => {
        if (!validateFormData()) {
            return
        }

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
            setSearchResultList(MarkData)
            console.log('searchResultList', searchResultList)
            simulateLoading()

        } catch (error) {
            // Alert('danger', 'Search Error.')
        } finally {
            setIsLoading(false)
        }

    }

    const VISIBLE_FIELDS = ['File Name', 'Part No.', 'File Action'] // 標題欄位

    const sortingOptions = [
        { label: 'Part No', value: 'part_no' },
        { label: 'Part Type', value: 'part_type' }
    ] // 排序的條件


    return (
        <div>
            <div className="m-4 border-b-2">
                <h1 className=" py-2 text-start text-2xl"></h1>
            </div>
            <div className="flex justify-center p-[0.5em] border-b-2">
                <label className='w-36 flex p-[.5em]'>Part No.</label>
                <Input
                    name="partNumber"
                    value={formData.partNumber}
                    required={true}
                    onChange={(e) => handleInputChange('partNumber', e.target.value)}
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
                    onChange={(e) => handleInputChange('partType', e.target.value)}
                    options={SelectOptionsList['partType']}
                />
                <label className='w-32 flex p-[.5em]'>File Category</label>
                <SelectInput
                    className='flex-1'
                    value={formData.fileCategory}
                    name="fileCategory"
                    defaultValue={SelectOptionsList['fileCategory'][0]}
                    onChange={(e) => handleInputChange('fileCategory', e.target.value)}
                    options={SelectOptionsList['fileCategory']}
                />
            </div>
            <SearchBar onSearch={handleSearchResult} setFormData={setFormData} formData={formData} setShowResult={setShowResult} setSearchResultList={setSearchResultList} />
            {/* <div className='w-full flex gap-4 h-8'>
                <p>Founded result:{resultCount}</p>
            </div> */}
            <div>
                {errors.map((error, index) => (
                    <ContentAlert key={index} variant={'filled'} type={'error'} alertText={error} />
                ))}
            </div>

            {/* 新增的排序按鈕與選項 */}
            <div className='flex justify-between items-center p-4'>
                <h2 className='text-s font-bold'>Search Results :{resultCount}</h2>
                <div>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="centered-select  mr-4">
                        <option value="part_no" className="centered-option">Part No</option>
                        <option value="part_type" className="centered-option">Part Type</option>
                    </select>
                    <button className='button button-primary h-8 w-24 large-text' onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                        {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>
            </div>

            {/* 新增的標頭欄位 */}
            <div className='flex items-center justify-between p-4 bg-gray-400 rounded'>
                {VISIBLE_FIELDS.map((field, index) => (
                    <span key={index} className='font-bold  p-2 text-center'>
                        {field}
                    </span>
                ))}
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