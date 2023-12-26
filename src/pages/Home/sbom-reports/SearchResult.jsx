import React, { useState, useEffect } from 'react'
import { Pagination } from '@mui/material'
import Stack from '@mui/material/Stack'
import Checkboxes from './mui-components/CheckBox'

const SearchResult = ({ resultData, selectedCheckBox, result, setResultCount, handleSearchResult, page, setPage }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    // const [page, setPage] = useState(1);

    useEffect(() => {
        setSelectedItems(selectedCheckBox)
    }, [selectedCheckBox])

    const handleBulkDownload = () => {

        selectedItems.forEach(fileId => {
            console.log(`一次下載所有檔案：${fileId}`)
        })
    }

    const handleDownload = async (fileId) => {
        //Test Download function
        console.log(`下載檔案：${fileId}`)

        // Download File from API
        // try {
        //     const response = await GetDownloadThirdPartyPackage(fileId)
        //     console.log(response)

        //     if (!response.ok) {

        //     }

        //     // 取得檔案名稱，先假設後端在 response headers 中提供檔案名稱，要跟kevin討論能不能在header放資訊
        //     const fileName = response.headers['content-disposition'].split('filename=')[1]
        //     // 'filename= TEST.pdf'
        //     // 將檔案內容設置到 Blob 中，並設定檔案類型
        //     const blob = new Blob([response.data], { type: response.headers['content-type'] })
        //     const link = document.createElement('a')
        //     link.href = window.URL.createObjectURL(blob)

        //     // 連結的下載檔案的名稱
        //     link.download = fileName
        //     document.body.appendChild(link)
        //     link.click()
        //     document.body.removeChild(link)
        // } catch (error) {
        //     console.error('下載檔案失敗', error)
        // }
    }

    const Items = ({ currentItems }) => {
        // console.log('currentItems', currentItems);

        /**
         * 處理checkbox file_id 改變的function，單選打勾時，會setSelectedItems
         * @param {*} file_id 
         */
        const handleCheckboxChange = (file_id) => {
            console.log('file_id', file_id)
            setSelectedItems(prev => {
                if (prev.includes(file_id)) {
                    return prev.filter(id => id !== file_id)
                } else {
                    return [...prev, file_id]
                }
            })
        }

        return (
            <div className="flex flex-col space-y-4 h-50">

                {currentItems.map((item) => (
                    <div
                        key={item._id} // 使用檔案的 ID 作為 key，確保唯一性
                        className="flex items-center justify-between p-4 bg-gray-200 rounded"
                    >
                        <div className="flex justify-center items-center w-1/6 mr-4">
                            <span className="">
                                <Checkboxes
                                    checked={selectedItems.includes(item._id)}
                                    onChange={() => handleCheckboxChange(item._id)}
                                />
                            </span>
                        </div>
                        <div className="flex justify-center items-center p-4 text-center w-1/6 text-xs ">
                            <span className="" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{item.file_name}</span>
                        </div>
                        <div className="flex justify-center items-center p-4 text-center w-1/6">
                            <span className="">{item.rom_type}</span>
                        </div>
                        <div className="flex justify-center items-center p-4 text-center w-1/6">
                            <span className="">{item.file_type}</span>
                        </div>
                        <div className="flex justify-center items-center p-4 text-center w-1/6">
                            <button
                                className="button button-success h-8"
                                onClick={() => handleDownload(item._id)}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }


    const PaginatedItems = ({ page, setPage, items, result }) => {
        console.log('PaginatedItems init: items', items);
        // const [page, setPage] = useState(1);
        const itemsPerPage = 10

        const handlePageChange = (event, value) => {
            console.log('PaginatedItems: handlePageChange s value:', value);
            console.log('e.target:', event.target);
            // setPage(value);
            
            console.log('After setPage:', value);

            const pageSearchData = {
                page: value,
                limit: 10,
                sutType: items[0].rom_type,
                fileType: items[0].file_type,
                fileName: items[0].file_name,
            };

            handleSearchResult(pageSearchData);

            setPage(value);
        }

        // const startIndex = (page - 1) * itemsPerPage  // 0
        // const endIndex = startIndex + itemsPerPage  // 0 + 10
        // const currentItems = items.slice(startIndex, endIndex);
        console.log('PaginatedItems: items', items);
        console.log('PaginatedItems: result:', result);
        console.log('PaginatedItems: result totalItems:', result.totalItems);
        const pageCount = Math.ceil((result.totalItems > 0 ? result.totalItems : 1) / itemsPerPage);

        return (
            <>
                <Items currentItems={items} />
                <Stack spacing={2} justifyContent="center" alignItems="center">
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        sx={{
                            '.MuiPagination-ul': {
                                margin: '16px',
                                justifyContent: 'center',
                            },
                        }}
                    />
                </Stack>
            </>
        )
    }

    return (
        <div>
            {
                resultData.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-xl font-medium text-red-500">Sorry, No Search Result</p>
                    </div>
                ) : (
                    <>
                        <PaginatedItems  page={page} setPage={setPage} items={resultData} result={result} />
                        {selectedItems.length > 0 && (
                            <div className="flex justify-center p-4">
                                <button
                                    className="button button-primary h-10 px-5"
                                    onClick={handleBulkDownload}
                                >
                                    Download All Selected
                                </button>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    )
}

export default SearchResult