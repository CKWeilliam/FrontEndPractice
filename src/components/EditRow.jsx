import React from 'react'

import IconButton from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import SaveIcon from '@mui/icons-material/Save'
import ClearIcon from '@mui/icons-material/Clear'

const EditRow = ({ children, onSave, onCancel }) => {
    return (
        <tr className="row h-12 border-collapse items-center border-2 bg-kb-main/10">
            {children}

            <td className="col-2 x  flex flex-row justify-center">
                <IconButton onClick={onSave} color="primary">
                    <SaveIcon />
                </IconButton>
                <IconButton color="warning" onClick={onCancel}>
                    <ClearIcon />
                </IconButton>
            </td>
        </tr>
    )
}

const InputTextField = ({ col, name, value, onChange, size }) => (
    <td className={`col-${col} border-collapse border-x`}>
        <TextField name={name} value={value} onChange={onChange} size={size || 'small'} />
    </td>
)

const InputOptions = ({ col, name, value, onChange, size, options, defaultOption }) => {
    const renderOptions = options.map((option, index) => {
        if (option.value == defaultOption) {
            return (
                <MenuItem defaultChecked key={`${option.value}-${index}`} value={option.value}>
                    {option.text}
                </MenuItem>
            )
        }
        return (
            <MenuItem key={`${option.value}-${index}`} value={option.value}>
                {option.text}
            </MenuItem>
        )
    })

    return (
        <td className={`col-${col} border-collapse border-x`}>
            <TextField name={name} value={value} onChange={onChange} size={size || 'small'} select>
                {renderOptions}
            </TextField>
        </td>
    )
}

InputTextField.displayName = 'InputTextField'
InputOptions.displayName = 'InputOptions'

EditRow.InputTextField = InputTextField
EditRow.InputOptions = InputOptions

export default EditRow
