import React from 'react'

import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

const ListRow = ({ hasAction, onEdit, children }) => {
    // const col = Children.map(children, (child) =>
    //     child.type.displayName === 'ListCol' ? child : null
    // )
    return (
        <tr className="row h-12 items-center border-x-[1px] border-b-[1px] border-gray-300">
            {children}
            {hasAction && (
                <td className="col-2 flex flex-row justify-center">
                    <IconButton color="success" size="medium" onClick={onEdit} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </td>
            )}
        </tr>
    )
}

// const ListCol = ({ content, className }) => (
//     <td className={className}>{content}</td>
// )
// ListCol.displayName = 'ListCol'
// ListRow.ListRow = ListCol

export default ListRow
