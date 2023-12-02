import React from 'react'

const Switch = ({ labelL, labelR, onSwitch, checked }) => {
    return (
        <div className="flex w-full items-center justify-center overflow-hidden">
            <div className="flex w-full items-center justify-end gap-2">
                <p className="bg-transparent text-sm">View:</p>
                <span className="mr-2 text-sm text-gray-900">{labelL || ''}</span>
                <label className="relative mr-2 inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" checked={checked} readOnly />
                    <button
                        onClick={onSwitch}
                        className="peer h-3 w-8 rounded-full bg-blue-500 after:absolute after:left-[0px] after:top-[-2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-gray-300 peer-focus:ring-blue-300"
                    ></button>
                </label>
                <span className="text-sm text-gray-900">{labelR || ''}</span>
            </div>
        </div>
    )
}

export default Switch
