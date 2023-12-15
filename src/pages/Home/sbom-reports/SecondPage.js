import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material'
import { default as Input, SelectInput, TextArea } from "../../../components/ui/input";
import { Loading } from '../../../components/ui';
import SearchBar from '../third-party-package/components/SearchBar';
import { SelectOptionsList } from "../third-party-package/components/SelectOptionList"; // list data
import { MarkData } from '../third-party-package/components/MarkFile'; // list data
import SearchResult from './SecondPage_SearchResult'; 
import Checkboxes from '../third-party-package/components/uploadStatus/CheckBox';
import Sort_Result from '../third-party-package/components/uploadStatus/Sort_Result';
import { sortResults, simulateLoading } from '../../utils/commonFunctions';

const SecondPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [resultCount, setResultCount] = useState(0);
    const [searchResultList, setSearchResultList] = useState([]); 
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // 用來排序的方法 升、降
    const [sortBy, setSortBy] = useState('id');   // 排序的條件

    const [formData, setFormData] = useState({
        partNumber: '',
        partType: '',
        fileCategory: '',
        fileName: '',
        files: [],
    })

    /**
     * 偵測isLoading 與 formData
     */
    useEffect(() => {
        setResultCount(searchResultList.length)
        // console.log('Result count updated:', resultCount)
        // console.log('formData updated:', formData)
    }, [formData, isLoading])

    /**
     * 偵測當排序條件與順序發生變動時 呼叫排序方法
     */
    useEffect(() => {
        if (searchResultList.length > 0) {
            setSearchResultList(sortResults(searchResultList, sortBy, sortOrder));
        }
    }, [sortBy, sortOrder]);  

    /**
     * 處理input資料事件
     * @param {*} e 
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    /**
     * 處理全選checkbox後的file_id
     * @param {*} e 
     */
    const handleSelectAll = (e) => { 
        if (e.target.checked) { 
            setSelectedItems(searchResultList.map(item => item.file_id)); 
        } else {
            setSelectedItems([]);
        }
    };

    /**
     * 處理搜尋結果
     * @param {*} searchData 
     */
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
            setSearchResultList(MarkData);

        } catch (error) {
            console.log('Failing post')
        } finally {
            simulateLoading({
                setIsLoading: () => setIsLoading(false), 
                setShowResult: () => setShowResult(true), 
                delay: 1000
            });
        }

    }

    /**
     * 標題欄位
     */
    const VISIBLE_FIELDS = ['File Name', 'Part No.', 'Part Type', 'File Action']; 

    /**
     * 排序的條件
     */
    const sortingOptions = [
        { label: 'Part No', value: 'part_no' },
        { label: 'Part Type', value: 'part_type' }
    ];

    return (
        <Container style={{ '& *': { boxSizing: 'border-box' } }}>
            <div className="m-4 border-b-2">
                <h1 className="text-2xl font-bold text-start mb-4 dark:border-white w-full flex items-center">Search Page
                </h1>
            </div>
            <div >
                <div >
                    <div className="flex justify-center items-center p-[0.5em] border-b-2">
                        <label className='w-32 flex p-[.5em]'>SUT Type</label>
                        <SelectInput
                            className='flex-1'
                            value={formData.partType}
                            name="partType"
                            defaultValue={SelectOptionsList['partType'][0]}
                            onChange={handleInputChange}
                            options={SelectOptionsList['partType']}
                        />
                        <label className='w-32 flex p-[.5em]'>File Type</label>
                        <SelectInput
                            className='flex-1'
                            value={formData.fileCategory}
                            name="fileCategory"
                            defaultValue={SelectOptionsList['fileCategory'][0]}
                            onChange={handleInputChange}
                            options={SelectOptionsList['fileCategory']}
                        />
                    </div>
                    <SearchBar onSearch={handleSearchResult} setFormData={setFormData} formData={formData} setShowResult={setShowResult} setSearchResultList={setSearchResultList} />

                    {/* 新增的排序按鈕與選項 */}
                    <div className='flex justify-between items-center p-4'>
                        <h2 className='text-xl font-bold'>Found Results： {resultCount}</h2>
                        <Sort_Result sortOrder={sortOrder} setSortOrder={setSortOrder} sortBy={sortBy} setSortBy={setSortBy}/>
                    </div>

                    {/* 新增的標頭欄位 */}
                    <div className='flex justify-between p-4 border-b bg-blue-600'>
                        <span className='flex items-center justify-center font-bold text-white border border-gray-300 p-2 w-1/6'>
                            <Checkboxes
                                onChange={handleSelectAll}
                                checked={selectedItems.length === searchResultList.length && searchResultList.length > 0}
                                indeterminate={selectedItems.length > 0 && selectedItems.length < searchResultList.length}
                            />Select All
                        </span>
                        {VISIBLE_FIELDS.map((field, index) => (
                            <span key={index} className='font-bold text-white border border-gray-300 p-4 text-center w-1/6'>
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
        </Container>
    );
};

export default SecondPage;