import React, { useState } from 'react'
import Loading from '../loading'

const SortTable = ({
    allData,
    showedData,
    headerData,
    renderHeader,
    renderBody,
    isLoading,
    isError,
    sortData,
    apppendDataOnScroll
}) => {
    const [sortOrder, setOrder] = useState('asec')
    const handleScroll = (e) => {
        const tempData = [...showedData]
        if (showedData.length > 0) {
            if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 1) {
                if (tempData.length <= allData.length) {
                    let temp = null
                    if (tempData.length + 10 > allData.length) {
                        temp = allData.slice(tempData.length, allData.length)
                    } else {
                        temp = allData.slice(tempData.length, tempData.length + 10)
                    }

                    apppendDataOnScroll(temp)
                }
            }
        }
    }

    const handleSortData = (e) => {
        e.preventDefault()
        const id = e.currentTarget.id

        setOrder((prev) => {
            if (prev === 'asec') return 'desc'
            else if (prev === 'desc') return 'origin'
            else return 'asec'
        })

        // controll sort icon
        headerData.forEach((item) => {
            if (item.id === e.currentTarget.id) {
                if (sortOrder === 'asec') {
                    item.sort = 'bx bx-sort-up border-2 border-blue-500 rounded'
                } else if (sortOrder === 'desc') {
                    item.sort = 'bx bx-sort-down border-2 border-blue-500 rounded'
                } else {
                    item.sort = 'bx bx-sort-alt-2 border-2 border-blue-500 rounded'
                }
            } else item.sort = 'bx bx-sort-alt-2'
        })

        let temp = null

        if (sortOrder === 'asec') {
            temp = [...allData].sort((x, y) => String(x[id]).localeCompare(y[id], 'en', { numeric: true }))
        } else if (sortOrder === 'desc') {
            temp = [...allData].sort((x, y) => String(y[id]).localeCompare(x[id], 'en', { numeric: true }))
        } else {
            temp = [...allData].sort((x, y) => x.oid - y.oid)
        }

        sortData([...temp], [...temp].slice(0, 30))
    }

    const showContent = () => {
        if (isLoading) {
            return (
                <div className="flex h-full w-full flex-col items-center justify-center py-10">
                    <Loading />
                    <p>Data is FETCHING ...</p>
                </div>
            )
        }

        if (isError) {
            return <p className="pt-5 text-center text-xl text-red-600">Oops, something is wrong!</p>
        }

        if (allData) {
            if (allData.length <= 0) {
                return <p className="pt-5 text-center text-xl">No result is found</p>
            }
        }

        return renderBody
    }

    return (
        <div
            name="table"
            className="relative bottom-0 left-0 right-0 top-0 box-border h-full flex-wrap overflow-x-auto p-2"
        >
            <div
                className={
                    'top-0 mx-2 flex min-h-[3rem]  flex-wrap border-2 border-gray-300 px-2 text-center  text-sm font-medium text-black'
                }
            >
                {renderHeader(handleSortData)}
            </div>

            <div
                name="table-body"
                className="relative mr-2 mt-2 h-[calc(100%-4rem)] overflow-y-auto rounded-md px-2 pt-2 text-sm"
                onScroll={handleScroll || null}
            >
                {showContent()}
            </div>
        </div>
    )
}
export default SortTable
