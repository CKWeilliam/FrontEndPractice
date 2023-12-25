import React, { useState, useEffect } from 'react'
import { Container } from '@mui/material'
import { default as Input, SelectInput, TextArea } from '../../../components/ui/input'
import { Loading } from '../../../components/ui'
import SearchBar from './SearchBar'
import { SelectOptionsList } from './SelectOptionList'
import MarkData from './RealMarkFile'
import Checkboxes from './mui-components/CheckBox'
import SearchResult from './SearchResult'
import SortResult from './mui-components/Sort_Result'
// import { sortResults, simulateLoading } from '../../utils/commonFunctions'


const SbomReports = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [resultCount, setResultCount] = useState(0)
    const [searchResultList, setSearchResultList] = useState([]) 
    const [selectedItems, setSelectedItems] = useState([])
    const [sortOrder, setSortOrder] = useState('asc') // 用來排序的方法 升、降
    const [sortBy, setSortBy] = useState('id')   // 排序的條件

    const [SearchData, setSearchData] = useState({
        page: '',
        limit: '',
        sutType: '',
        fileType: '',
        fileName: '',
    })

    /**
     * 偵測isLoading 與 SearchData
     */
    useEffect(() => {
        setResultCount(searchResultList.length)
        // console.log('Result count updated:', resultCount)
        // console.log('SearchData updated:', SearchData)
    }, [SearchData, isLoading])

    /**
     * 偵測當排序條件與順序發生變動時 呼叫排序方法
     */
    // useEffect(() => {
    //     if (searchResultList.length > 0) {
    //         setSearchResultList(sortResults(searchResultList, sortBy, sortOrder))
    //     }
    // }, [sortBy, sortOrder])  

    /**
     * 處理input資料事件
     * @param {*} e 
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchData({
            ...SearchData,
            [name]: value,
        })
    }

    /**
     * 處理全選checkbox後的file_id
     * @param {*} e 
     */
    const handleSelectAll = (e) => { 
        if (e.target.checked) { 
            setSelectedItems(searchResultList.map(item => item.file_id)) 
        } else {
            setSelectedItems([])
        }
    }
    const simulateLoading = (options = {}) => {
        const { delay = 1000, ...stateUpdates } = options
    
        setTimeout(() => {
            Object.values(stateUpdates).forEach(updateFunc => {
                if (typeof updateFunc === 'function') {
                    updateFunc()
                }
            })
        }, delay)
    }

    /**
     * 處理搜尋結果
     * @param {*} searchData 
     */
    const handleSearchResult = async (searchData) => {
        console.log('測試測試測試',MarkData[0].totalItems)
        setIsLoading(true)
        // If the backend has changed the Body's key, modify it here.
        const keyMapping = {
            'page': 'page',
            'limit': 'limit',
            'sutType': 'rom_type',
            'fileType': 'file_type',
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
            // const searchResult = await getReportSearch()
            // setSearchResultList(searchResult.data)
            // console.log('searchResultList', searchResultList) 
            setSearchResultList(MarkData[0].data)
            console.log('資料', MarkData[0].data)

        } catch (error) {
            console.log('Failing post')
        } finally {
            simulateLoading({
                setIsLoading: () => setIsLoading(false), 
                setShowResult: () => setShowResult(true), 
                delay: 1000
            })
        }

    }

    /**
     * 標題欄位
     */
    const VISIBLE_FIELDS = ['File Name', 'SUT Type', 'File Type',  'File Action'] 

    /**
     * 排序的條件
     */
    // const sortingOptions = [
    //     { label: 'Part No', value: 'part_no' },
    //     { label: 'Part Type', value: 'part_type' }
    // ]

    return (
        <div>
            <div className="m-4 border-b-2">
                <h1 className="text-2xl font-bold text-start mb-4 dark:border-white w-full flex items-center">Search Page
                    {/* <About /> */}
                </h1>
            </div>
            <div >
                <div >
                    <div className="flex justify-center items-center p-[0.5em] border-b-2">
                        <label className='w-32 flex p-[.5em]'>SUT Type</label>
                        <SelectInput
                            className='flex-1'
                            value={SearchData.sutType}
                            name="sutType"
                            defaultValue={SelectOptionsList['sutType'][0]}
                            onChange={handleInputChange}
                            options={SelectOptionsList['sutType']}
                        />
                        <label className='w-32 flex p-[.5em]'>File Type</label>
                        <SelectInput
                            className='flex-1'
                            value={SearchData.fileType}
                            name="fileType"
                            defaultValue={SelectOptionsList['fileType'][0]}
                            onChange={handleInputChange}
                            options={SelectOptionsList['fileType']}
                        />
                    </div>
                    <SearchBar onSearch={handleSearchResult} setSearchData={setSearchData} searchData={SearchData} setShowResult={setShowResult} setSearchResultList={setSearchResultList} />

                    {/* 新增的排序按鈕與選項 */}
                    <div className='flex justify-between items-center p-4'>
                        <h2 className='text-xl font-bold'>Found Results： {resultCount}</h2>
                        {/* <SortResult sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy}/> */}
                    </div>

                    {/* 新增的標頭欄位 */}
                    <div className='flex items-center justify-between p-4 bg-gray-400 rounded'>
                        <span className='flex items-center justify-center font-bold border-gray-300 p-2 w-1/6'>
                            <Checkboxes
                                onChange={handleSelectAll}
                                checked={selectedItems.length === searchResultList.length && searchResultList.length > 0}
                                indeterminate={selectedItems.length > 0 && selectedItems.length < searchResultList.length}
                            />Select All
                        </span>
                        {VISIBLE_FIELDS.map((field, index) => (
                            <span key={index} className='font-bold border border-gray-400 p-4 text-center w-1/6'>
                                {field}
                            </span>
                        ))} 
                    </div>

                    {isLoading ? <Loading /> : (
                        showResult && <SearchResult
                            resultData={searchResultList}
                            selectedCheckBox={selectedItems}
                            setResultCount={setResultCount}
                        // Input data from API to SearchResult

                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default SbomReports