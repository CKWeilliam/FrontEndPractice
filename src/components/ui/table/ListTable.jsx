import React, { useEffect, useState } from 'react'
import Loading from '../loading'

/**
 * The use of block is to letting the table scrollable
 * @param {} param0 
 * @returns 
 */
function NormalHeader({tableHeader}){
    return (
        <thead className="sticky top-[-1px] h-12 bg-white border">
            <tr>
                {tableHeader.map((head, index) => (
                    <th
                        scope='col'
                        key={head.name + index}
                        className={`${head.w === 'auto' ? 'flex-auto' : 'col-' + head.w} text-${head.justify || 'center'} bg-white hover:bg-kb-main/50 hover:cursor-default cursor-default dark:text-black`}
                    >
                        <div className="flex h-full w-full items-center p-2">
                            <p className="">{head.name}</p>
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    ) 
}

function SortableHeader({tableHeader, handleOnSort, sortId, sortOrder}) {
    let sortArrow = null
    if (sortOrder === 'asec') sortArrow = 'bx bx-sort-down border-2 border-blue-500 rounded'
    else if (sortOrder === 'desc') sortArrow = 'bx bx-sort-up border-2 border-blue-500 rounded'
    else sortArrow = 'bx bx-sort-alt-2 border-2 border-blue-500 rounded'

    return (
        <thead className="sticky top-[-1px] h-12 bg-white">
            <tr>
                {tableHeader.map((head, index) => (
                    <th
                        key={head.name + index}
                        className={`${head.w === 'auto' ? 'flex-auto' : 'col-' + head.w} text-${
                            head.justify || 'center'
                        } cursor-pointer  bg-white hover:bg-kb-main/50 dark:text-black`}
                        onClick={() => handleOnSort(head.id)}
                    >
                        <div className="flex h-full w-full items-center p-2">
                            <p className="flex-auto">{head.name}</p>
                            <span
                                className={` font-medium ${head.id === sortId ? sortArrow : 'bx bx-sort-alt-2'}`}
                            />
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

function Table({ tableHeader, dataToShowed, renderBody, isLoading, style, sortable }) {
    const [cache, setCache] = useState()
    const [sortOrder, setOrder] = useState('asec')
    const [sortId, setId] = useState()
    const [scrollFlag, setScrollFlag] = useState(50)

    useEffect(() => {
        if (dataToShowed) {
            // a cool thing. seems like this is call by reference.
            // So either it is setting state here, it is also affecting the original data.
            setCache(dataToShowed)
        }
    }, [dataToShowed])

    useEffect(() => {
        let element = document.getElementById('scroll-table')
        const onScroll = (e) => {
            if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 100) {
                setScrollFlag((prev) => prev + 30)
            }
        }

        element.addEventListener('scroll', onScroll)

        return () => element && element.removeEventListener('scroll', onScroll)
    })

    useEffect(() => {
        setScrollFlag(50)
    }, [cache])

    function handleOnSort(id) {
        //Define the next Order to be render at begin
        let nextOrder = (() => {
            if(sortId === id){
                if(sortOrder === 'asec') return 'desc'
                else if (sortOrder === 'desc') return 'origin'
                else return 'asec'
            }
            else return 'asec'
        })()

        let temp = null
        if (nextOrder === 'asec') {
            temp = cache.sort((x, y) => String(x[id]).localeCompare(y[id], 'en', { numeric: true }))
        } else if (nextOrder === 'desc') {
            temp = cache.sort((x, y) => String(y[id]).localeCompare(x[id], 'en', { numeric: true }))
        } else {
            temp = cache.sort((x, y) => x.oid - y.oid)
        }

        setOrder(nextOrder)
        setId(id)
        setCache(cache)
    }

    let headers = null
    
    if(sortable){
        headers = <SortableHeader tableHeader={tableHeader} sortId={sortId} sortOrder={sortOrder} handleOnSort={handleOnSort} />
    }
    else {
        headers = <NormalHeader tableHeader={tableHeader}/>
    }

    let body = null
   
    if (typeof renderBody === 'function')
        if (tableHeader) {
            body = (
                <tbody className="py-1">
                    {isLoading && (
                        <tr>
                            <td>
                                <Loading />
                            </td>
                        </tr>
                    )}
                    {!isLoading && cache && renderBody(cache.slice(0, scrollFlag))}
                </tbody>
            )
        }

    return (
        <div id="scroll-table" className='overflow-auto max-h-[500px] my-4'>
            <table
                className="list-table box-border whitespace-nowrap h-full w-full"
                style={{ maxHeight: style?.maxHeight }}
            >
                {headers}
                {body}
            </table>
        </div>
    )
}

export default Table
