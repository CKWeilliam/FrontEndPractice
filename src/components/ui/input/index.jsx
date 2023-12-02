import React, { forwardRef, useEffect, useRef, useState } from 'react'
import './input.css'

/**
 * The FloatInput and FloatTextArea are experimental components.
 * Please use the Input, SelectInput and Textarea componnet instead. 
 */

export const FloatInput = ({
    id,
    type,
    placeholder,
    ref,
    onChange,
    label,
    vaild = true,
    iconClass,
    name,
    value,
    onClick
}) => {
    let vaildStyle = 'border-gray-500'

    if (!vaild) vaildStyle = 'border-2 border-red-500'
    else vaildStyle = 'border-2 border-kb-secondary'

    return (
        <div className="relative flex w-full">
            <input
                id={id}
                ref={ref !== undefined ? ref : undefined}
                onChange={onChange || null}
                type={type || 'text'}
                placeholder={placeholder || ''}
                name={name}
                value={value !== undefined ? value : undefined}
                className={`${vaildStyle} peer block w-full appearance-none rounded-md bg-transparent px-2.5 py-1.5 text-sm text-kb-primary placeholder:opacity-0 focus:border-kb-main focus:outline-none focus:placeholder:opacity-100`}
            />
            <label
                htmlFor={id}
                className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform rounded-lg bg-white px-2 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-white peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75  peer-focus:text-kb-main"
            >
                {label || placeholder}
            </label>
            {iconClass && (
                <button onClick={onClick && onClick}>
                    <span className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-black">
                        <i className={iconClass} />
                    </span>
                </button>
            )}
        </div>
    )
}

export const FloatTextArea = (props) => {
    const { id, type, placeholder, ref, onChange, label, vaild = true, iconClass, className } = props
    let vaildStyle = 'border-gray-500'

    if (!vaild) vaildStyle = 'border-2 border-red-500'
    else vaildStyle = 'border-2 border-kb-secondary'

    return (
        <div className={`relative flex ${className}`}>
            <textarea
                id={id}
                ref={ref || null}
                onChange={onChange || null}
                type={type || 'text'}
                placeholder={placeholder || ''}
                className={`${vaildStyle} peer block w-full appearance-none rounded-md bg-transparent px-2.5 py-1.5 text-sm text-kb-primary placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-300 focus:border-kb-main focus:outline-none focus:placeholder:opacity-100`}
            />
            <label
                htmlFor={id}
                className="absolute left-5 top-0 z-10 origin-[0] -translate-y-4 scale-75 transform rounded-lg bg-white px-2.5  text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-white peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75  peer-focus:text-kb-main"
            >
                {label || placeholder}
            </label>
            {iconClass && (
                <button onClick={onChange && onChange}>
                    <span className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-black">
                        <i className={iconClass} />
                    </span>
                </button>
            )}
        </div>
    )
}

export const TextArea = forwardRef((props, ref) => {
    const {
        id,
        type,
        placeholder,
        onChange,
        label,
        required,
        name,
        value,
        className,
        disabled,
        inputLength,
        maxInput
    } = props
    let wordCount = null

    // render word count text
    if (inputLength !== undefined && maxInput) {
        wordCount = (
            <p className="w-full text-end text-sm">
                {inputLength}/{maxInput}
            </p>
        )
    }

    if (ref !== undefined) {
        return (
            <div className="flex w-full flex-wrap items-center justify-center">
                {label && (
                    <label htmlFor={id} className="col-3 block text-start">
                        {label || placeholder}
                        {required ? <span className="text-lg font-medium text-red-600">*</span> : null}
                    </label>
                )}

                <textarea
                    id={id}
                    ref={ref}
                    name={name || null}
                    value={value && value}
                    onChange={onChange && onChange}
                    type={type || 'text'}
                    placeholder={placeholder || ''}
                    className={`${className} ${disabled ? ' cursor-not-allowed ' : ''}kb-input`}
                    required={required}
                    disabled={disabled || null}
                />
                {wordCount}
            </div>
        )
    }
    return (
        <div className="flex w-full flex-wrap items-center justify-center">
            {label && (
                <label htmlFor={id} className="col-3 block text-start">
                    {label || placeholder}
                    {required ? <span className="text-lg font-medium text-red-600">*</span> : null}
                </label>
            )}

            <textarea
                id={id}
                name={name || null}
                value={value !== undefined && value}
                onChange={onChange && onChange}
                type={type || 'text'}
                placeholder={placeholder || ''}
                className={`${className} ${disabled ? ' cursor-not-allowed ' : ''} kb-input `}
                required={required}
                disabled={disabled || null}
            />
            {wordCount}
        </div>
    )
})

TextArea.displayName = 'TextArea'

export const Select = (props) => {
    const {
        id,
        type,
        placeholder,
        ref,
        onChange,
        label,
        required,
        name,
        value,
        className,
        options,
        renderOptions,
        defaultValue
    } = props
    return (
        <div className="mb-1 flex w-full flex-wrap items-center justify-center">
            {label && (
                <label htmlFor={id} className="block pr-4 text-start text-sm">
                    {label || placeholder}
                    {required ? <span className="text-lg font-medium text-red-600">*</span> : null}
                </label>
            )}
            <select
                id={id}
                ref={ref !== undefined ? ref : undefined}
                name={name || null}
                value={value !== undefined ? value : undefined}
                defaultValue={defaultValue !== undefined ? defaultValue : undefined}
                onChange={onChange || null}
                type={type || 'text'}
                placeholder={placeholder || ''}
                className={`${className} h-[32px] min-w-[4px] flex-auto border-collapse rounded-md border-2 border-gray-300 p-1 m-1 focus:border-2 focus:border-kb-main focus:outline-none`}
                required={required}
            >
                {options
                    ? options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        )
                    )
                    : renderOptions()}
            </select>
        </div>
    )
}

export function SelectInput({
    name = 'select-input',
    value,
    defaultValue,
    options = [],
    placeholder = '',
    className = '',
    onChange = () => {},
    disabled
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(value || defaultValue)
    const elementRef = useRef()

    const handleOptionSelect = (option) => {
        setSelectedOption(option)
        onChange({ target: { name: name, value: option } })
        setIsOpen(false)
    }

    useEffect(() => {
        setSelectedOption(value)
    }, [value])

    useEffect(() => {
        const click = (e) => {
            if (!elementRef.current.contains(e.target)) setIsOpen(false)
        }

        window.addEventListener('mouseup', click)

        return () => window.removeEventListener('mouseup', click)
    }, [])

    return (
        <div
            ref={elementRef}
            className={`relative  h-[32px] min-w-[4px] ${isOpen ? 'border-kb-main' : 'border-gray-200'} ${
                disabled ? 'cursor-not-allowed' : null
            } border border-gray-400 transition-all rounded-md p-1 m-1 ${className} `}
        >
            <button
                className={` flex h-full w-full items-center justify-between rounded-md bg-white  px-2 text-gray-800 ${
                    disabled ? 'cursor-not-allowed' : null
                }`}
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span>{selectedOption || placeholder}</span>
                <span
                    className={`bx bx-chevron-down bx-sm  transition-all ${isOpen ? 'rotate-180 transform' : ''}`}
                ></span>
            </button>
            {
                <div
                    className={`absolute right-0 mt-2 max-h-60  w-full overflow-hidden rounded-md bg-transparent shadow-lg transition-all duration-150 ease-linear  ${
                        isOpen ? '' : 'max-h-[0]'
                    }`}
                >
                    <ul
                        className={`${isOpen ? 'z-[15]' : 'z-10'} relative flex flex-col overflow-hidden bg-white py-1`}
                    >
                        {options.map((option) => (
                            <li key={option}>
                                <button
                                    className={`${
                                        option === value ? 'bg-kb-main/30' : 'bg-white'
                                    } focus:bg-gray-30 h-[30px]  w-full px-4 text-left hover:bg-gray-200`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

const Input = (props) => {
    const {
        id,
        type,
        placeholder,
        ref,
        onChange,
        onFocus,
        label,
        required,
        name,
        value,
        className,
        defaultValue,
        list,
        isFaild,
        disabled
    } = props

    // useEffect(() => {
    //     if (name !== undefined && isFaild) {
    //         const element = document.getElementsByName(name)
    //         if (element.length > 0) element[0].classList.replace('border-gray-400', 'border-red-400')
    //     }
    // }, [isFaild])

    const renderList = () => {
        if (list) {
            return (
                <datalist id={name + '-list'}>
                    {list.map((option) => (
                        <option key={'datalist-' + option} value={option}>
                            {option}
                        </option>
                    ))}
                </datalist>
            )
        }
    }

    // this is preventing from causing error of 'changing controlled component's value from undefined value to defined value, also prevent the render while no value is actually coming.
    if (value !== undefined || defaultValue !== undefined) {
        if (ref !== undefined) {
            return (
                <div className={'mb-1 flex w-full flex-wrap items-center justify-center'}>
                    {label && (
                        <label htmlFor={id} className="block pr-4 text-start text-sm">
                            {label || placeholder}
                            {required ? <span className="text-lg font-medium text-red-600">*</span> : null}
                        </label>
                    )}
                    <input
                        id={id}
                        ref={ref || null}
                        name={name || null}
                        type={type || 'text'}
                        placeholder={placeholder || ''}
                        defaultValue={defaultValue || null}
                        className={`${className} kb-input ${disabled ? 'cursor-not-allowed' : null} ${isFaild && 'kb-faild'} `}
                        required={required}
                        list={list !== undefined ? name + '-list' : undefined}
                        disabled={disabled}
                    />
                    {list && renderList()}
                </div>
            )
        } else {
            return (
                <div  className={'mb-1 flex w-full flex-wrap items-center justify-center'}>
                    {label && (
                        <label htmlFor={id} className="block pr-4 text-start text-sm">
                            {label || placeholder}
                            {required ? <span className="text-lg font-medium text-red-600">*</span> : null}
                        </label>
                    )}
                    <input
                        id={id}
                        name={name || null}
                        value={value !== undefined ? value : undefined}
                        onChange={onChange || undefined}
                        onFocus={onFocus || undefined}
                        placeholder={placeholder || ''}
                        className={`${className} kb-input ${disabled ? 'cursor-not-allowed' : null}  ${isFaild && 'kb-faild'} `}
                        required={required}
                        list={list !== undefined  ? name + '-list' : undefined}
                        disabled={disabled}
                    />

                    {list && renderList()}
                </div>
            )
        }
    }
    return null
}

Input.TextArea = TextArea
Input.Select = Select
Input.SelectInput = SelectInput

export default Input
