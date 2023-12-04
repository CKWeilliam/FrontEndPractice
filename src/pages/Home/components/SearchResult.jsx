import React, { useState, useEffect, useRef  } from 'react'
import MarkData from './MarkFile'

const SearchResult = ({ resultData, count }) => {
  const [showData, setShowData] = useState([])
  const resultCount = useRef(0)

  const handleDownload = (fileId) => {
  // 在這裡實現下載邏輯，可以使用 fileId 來識別要下載的檔案
      console.log(`下載檔案：${fileId}`)
  // 在這裡根據 resultData 渲染您的搜索結果內容
  }

  useEffect(() => {
      if (MarkData.length > 10) {
          if (window.innerHeight > 1024) setShowData(MarkData.slice(0, 20))
          else setShowData(MarkData.slice(0, 10))
      } else setShowData(MarkData)

      resultCount.current = MarkData.length
      count(resultCount.current)
  }, [MarkData])


  return (
      <div>
          {/* <div className='w-full flex gap-4 h-8'>
              <p>Founded result:{resultCount.current}</p>
          </div> */}
          <div className="flex flex-col space-y-4">
              {MarkData.map((item) => (
                  <div
                      key={item.files[0].file_id.$oid} // 使用檔案的 ID 作為 key，確保唯一性
                      className="flex items-center justify-between p-4 bg-gray-200 rounded"
                  >
                      <div className="flex-shrink-0 mr-4">
                          <span className="">{item.files[0].file_name}</span>
                      </div>
                      <button
                          className="button button-success h-8"
                          onClick={() => handleDownload(item.files[0].file_id.$oid)}
                      >
                      Download
                      </button>
                  </div>
              ))}
          </div>
      </div>
  )
}


export default SearchResult