import React from 'react'

function GridTable({ data, cols = 12, format }) {
    const body = (f) => {
        if (f.custom) {
            if (typeof f.custom === 'function') return f.custom(data)
            else return f.custom
        } else {
            return data[f.id]
        }
    }
    return (
        <div className={`grid-table grid-cols-${cols}`}>
            {format.map((f) => (
                <>
                    <div key={'grid-table' + f.id} className={`title col-span-${f.tcol}`}>
                        {f.title}
                    </div>
                    <div key={f.id} className={`cell col-span-${f.col}`}>
                        {body(f)}
                    </div>
                </>
            ))}
        </div>
    )
}

export default GridTable