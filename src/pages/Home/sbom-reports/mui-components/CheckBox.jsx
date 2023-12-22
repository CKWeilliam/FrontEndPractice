import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
// https://mui.com/material-ui/react-checkbox/
// 需要調整樣式的話，到mui官方文件選擇

export default function Checkboxes({checked, onChange}) {
    return (
        <Checkbox {...label} checked={checked} onChange={onChange}/> 
    )
}

