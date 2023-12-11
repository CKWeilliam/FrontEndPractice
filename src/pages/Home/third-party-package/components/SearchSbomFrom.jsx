import React, { useState } from 'react'
import { MarkData } from './MarkFile'
import ReactPaginate from 'react-paginate'
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

    
    const itemsPerPage = 5

    const PaginatedItems = ({ items }) => {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage
        console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        const currentItems = items.slice(itemOffset, endOffset)
        // console.log(currentItems)
        const pageCount = Math.ceil(items.length / itemsPerPage)
        setCount(MarkData.length)
  
        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            )
            setItemOffset(newOffset)
        }
        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </>
        )
    }


    return (
        <PaginatedItems items={MarkData}/>
        // // Input API's Data
        // <PaginatedItems items={resultData}/>
    )
}
  

export default SearchResult