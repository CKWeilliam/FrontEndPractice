import React from 'react'
import MarkData from './MarkFile';

const SearchResult = ({ resultData }) => {

    const handleDownload = (fileId) => {
    // 在這裡實現下載邏輯，可以使用 fileId 來識別要下載的檔案
    console.log(`下載檔案：${fileId}`);
    // 在這裡根據 resultData 渲染您的搜索結果內容
    }


    return (
      <div className="flex flex-col space-y-4">
        {MarkData.map((item) => (
          <div
            key={item.files[0].file_id.$oid} // 使用檔案的 ID 作為 key，確保唯一性
            className="flex items-center justify-between p-4 bg-gray-200 rounded"
          >
            <div className="flex-shrink-0 mr-4">
              <span className="font-semibold">{item.files[0].file_name}</span>
            </div>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={() => handleDownload(item.files[0].file_id.$oid)}
            >
              下載
            </button>
          </div>
        ))}
      </div>
    );
  };
  

export default SearchResult