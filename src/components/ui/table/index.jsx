import React from 'react'
import Loading from '../loading'

const Table = ({ renderHeader, renderBody, handleScroll, isLoading, isError, data }) => {
    const showContent = () => {
        if (isError) {
            return <p className="pt-5 text-center text-xl text-red-600">Oops, something is wrong!</p>
        }

        if (data) {
            if (data.length <= 0) return <p className="pt-5 text-center text-xl">No result is found</p>
        }

        return renderBody
    }

    return (
        <div
            name="table"
            className="relative bottom-0 left-0 right-0 top-0 mr-[8px] box-border h-full flex-wrap overflow-x-auto p-2"
        >
            <div
                className={
                    'top-0 ml-2 mr-6 flex  min-h-[3rem] flex-wrap border-2 border-gray-300/90 px-2 text-center  text-sm font-medium text-black'
                }
            >
                {renderHeader}
            </div>
            {isLoading ? (
                <div className="flex w-full flex-col items-center justify-center py-10">
                    <Loading />
                    <p>Fetching data ...</p>
                </div>
            ) : (
                <div
                    name="table-body"
                    className="relative mr-2 mt-2 h-[calc(100%-4rem)] overflow-y-auto rounded-md px-2 pt-2 text-sm"
                    onScroll={handleScroll || null}
                >
                    {showContent()}
                </div>
            )}
        </div>
    )
}
export default Table
