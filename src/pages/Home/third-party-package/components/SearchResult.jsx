import React, { useState, useEffect, useRef } from 'react'
import { MarkData } from './MarkFile'
import ReactPaginate from 'react-paginate'


const SearchResult = ({ resultData, count }) => {
    const [showData, setShowData] = useState([MarkData.slice(0, 10)])

    const handleDownload = (fileId) => {
    // 在這裡實現下載邏輯，可以使用 fileId 來識別要下載的檔案
        console.log(`下載檔案：${fileId}`)
    // 在這裡根據 resultData 渲染您的搜索結果內容
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
    )
}
  

export default SearchResult