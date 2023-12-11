import React, { useState, useEffect, useRef } from 'react'
import { MarkData } from './MarkFile'
// import ReactPaginate from 'react-paginate'
import { Pagination } from '@mui/material'
import Stack from '@mui/material/Stack';
// import { GetDownloadThirdPartyPackage } from '../../../../services/thirdPartyPackage'



const SearchResult = ({ resultData, setCount }) => {
    console.log('resultData', resultData)
    console.log(JSON.stringify(resultData))

    const handleDownload = async (fileId) => {

        //Test Download function
        console.log(`下載檔案：${fileId}`)

        // Download File from API
        // try {
        //     const response = await GetDownloadThirdPartyPackage(fileId)
        //     console.log(response)

        //     // 取得檔案名稱，先假設後端在 response headers 中提供檔案名稱，要跟kevin討論能不能在header放資訊
        //     const fileName = response.headers['content-disposition'].split('filename=')[1]

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
        console.log(currentItems)
        return(
            <div className="flex flex-col space-y-4">
                {currentItems.map((item) => (
                    <div
                        key={item.file_id} // 使用檔案的 ID 作為 key，確保唯一性
                        className="flex items-center justify-between p-4 bg-gray-200 rounded"
                    >
                        <div className="flex-shrink-0 mr-4">
                            <span className="">{item.file_name}</span>
                        </div>
                        <button
                            className="button button-success h-8"
                            onClick={() => handleDownload(item.file_id)}
                        >
                    Download
                        </button>
                    </div>
                ))}
            </div>
        )
    }


    const PaginatedItems = ({ items }) => {
        const [page, setPage] = useState(1);
        const itemsPerPage = 5;
      
        const handlePageChange = (event, value) => {
          setPage(value);
        };
      
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = items.slice(startIndex, endIndex);
        const pageCount = Math.ceil(items.length / itemsPerPage);
      
        setCount(items.length);
      
        return (
          <>
            <Items currentItems={currentItems} />
            <Stack spacing={2} justifyContent="center" alignItems="center">
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{
                    '.MuiPagination-ul': {
                        marginTop: '16px',
                        justifyContent: 'center',
                    },
                }}
              />
            </Stack>
          </>
        );
      };
    


    return (
        <div>
        {
            MarkData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                    <p className="text-xl font-medium text-red-500">No Result</p>
                </div>
            ) : (
                <PaginatedItems items={MarkData} />
            )
        }
        </div>
        );
    };

export default SearchResult