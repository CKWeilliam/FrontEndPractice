import React from 'react'
import MAlert from '@mui/material/Alert'

const ContentAlert = ({ variant, type, alertText }) => {
    const [open, setOpen] = React.useState(true) // 用於控制alert 訊息開關

    const handleClose = () => {
        setOpen(false)
    }

    return ( 
        open && <MAlert 
            variant={variant} 
            severity={type} 
            // onClose={handleClose}
        >{alertText}</MAlert>
    )
}

export default ContentAlert
