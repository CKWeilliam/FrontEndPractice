import React from 'react'
import ToolTip from '../tooltip'

import './button.css'

const buttonColor = {
    'primary': 'button-primary',
    'secondary': 'button-secondary',
    'success': 'button-success',
    'danger': 'button-danger',
    'warning': 'button-warning'
}

const buttonSize = {
    'xs': 'h-6',
    'sm': 'h-8',
    'md': 'h-10',
    'lg': 'h-12',
    'xl': 'h-16'
}

const Button = ({color='primary', size='sm', type='text', variant, onClick,isActive, children, className}) => {
    return (
        <button className={`button ${buttonColor[color]} ${buttonSize[size]} ${isActive && 'button-active'} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

const TipsButton = ({color='primary', size='sm', onClick, children, className, tips}) => {
    return (
        <Button color={color} onClick={onClick} className={className} size={size}>
            <ToolTip text={tips}>
                {children} 
            </ToolTip>
        </Button>
    )
}

const AddButton = ({color='secondary', text='Add', onClick, children}) => {
    return(
        <Button color={color} onClick={onClick}>
            <ToolTip text={text}>
                <span className='bx bx-plus bx-sm' />
                {children}
            </ToolTip>
        </Button>
    )   
}

const EditButton = ({color='primary', text='Edit', onClick, children})=> {
    return(
        <Button color={color} onClick={onClick}>
            <ToolTip text={text}>
                <span className='bx bx-edit-alt bx-sm' />
                {children}
            </ToolTip>
        </Button>
    )
}

const StoreButton = ({color='success', text='Save', onClick, children}) => {
    return(
        <Button color={color} onClick={onClick}>
            <ToolTip text={text}>
                <span className='bx bx-save bx-sm' />
                {children}
            </ToolTip>
        </Button>
    )
}

const DeleteButton = ({color='danger', text='Delete', onClick, children}) => {
    return(
        <Button color={color} onClick={onClick}>
            <ToolTip text={text}>
                <span className='bx bx-trash-alt hover:bxs-trash-alt bx-sm' />
                {children}
            </ToolTip>
        </Button>
    )
}

const CancelButton = ({color='warning', text='Cancel', onClick, children}) => {
    return(
        <Button color={color} onClick={onClick}>
            <ToolTip text={text}>
                <span className='bx bx-x bx-sm' />
                {children}
            </ToolTip>
        </Button>
    )
}

Button.Add = AddButton
Button.Edit = EditButton
Button.Save = StoreButton
Button.Delete = DeleteButton
Button.Cancel = CancelButton
Button.TipsButton = TipsButton

export default Button