import React, { useEffect, useState } from 'react'

function Table({ children, tableHeader, dataToShowed }) {
    // const thead = Children.map(children, (child) =>
    //     child.type.displayName === 'THead' ? child : null
    // )
    // const tbody = Children.map(children, (child) =>
    //     child.type.displayName === 'TBody' ? child : null
    // )

    const [cache, setCache] = useState()
    const [sortOrder, setOrder] = useState('asec')
    const [sortId, setId] = useState()

    useEffect(() => {
        if (dataToShowed) {
            setCache(dataToShowed)
        }
    }, [dataToShowed])

    function handleOnSort(id) {
        let temp = null
        if (sortOrder === 'asec') {
            temp = cache.sort((x, y) => String(x[id]).localeCompare(y[id], 'en', { numeric: true }))
        } else if (sortOrder === 'desc') {
            temp = cache.sort((x, y) => String(y[id]).localeCompare(x[id], 'en', { numeric: true }))
        } else {
            temp = cache.sort((x, y) => x.oid - y.oid)
        }

        setId(id)
        setOrder((prev) => {
            if (prev === 'asec') return 'desc'
            else if (prev === 'desc') return 'origin'
            else return 'asec'
        })
        setCache(cache)
    }

    let headers = null
    if (tableHeader) {
        let sortArrow = null
        if (sortOrder === 'asec') {
            sortArrow = 'bx bx-sort-up border-2 border-blue-500 rounded'
        } else if (sortOrder === 'desc') {
            sortArrow = 'bx bx-sort-down border-2 border-blue-500 rounded'
        } else sortArrow = 'bx bx-sort-alt-2 border-2 border-blue-500 rounded'

        headers = (
            <thead className="h-12 border-2">
                <tr>
                    {tableHeader.map((head, index) => (
                        <th
                            key={head.name + index}
                            className={`${
                                head.w === 'auto' ? 'flex-auto' : 'col-' + head.w
                            } cursor-pointer hover:bg-kb-main/50`}
                            onClick={() => handleOnSort(head.id)}
                        >
                            {head.name} &nbsp;
                            <span className={`font-medium ${head.id === sortId ? sortArrow : 'bx bx-sort-alt-2'}`} />
                        </th>
                    ))}
                </tr>
            </thead>
        )
    }

    let body = null
    if (tableHeader && cache) {
        body = (
            <tbody>
                {cache.map((body, bodyIndex) => (
                    <tr
                        key={'tabel-tr-' + bodyIndex}
                        className="h-10 hover:border-[1px] hover:border-black hover:bg-gray-200"
                    >
                        {tableHeader.map((head, index) => (
                            <td key={`${index}-${head.id}`} className={`col-${head.w} `}>
                                {body[head.id]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        )
    }

    return (
        <table className="w-full">
            {headers}
            {body}
            {/* {thead}
            {tbody} */}
        </table>
    )
}

function Thead({ children, renderHeader }) {
    return (
        <thead>
            {children}
            {renderHeader && renderHeader()}
        </thead>
    )
}

function TBody({ children, renderBody }) {
    return (
        <tbody>
            {children}
            {renderBody && renderBody()}
        </tbody>
    )
}

Thead.displayName = 'THead'
TBody.displayName = 'TBody'

Table.Thead = Thead
Table.TBody = TBody

export default Table
