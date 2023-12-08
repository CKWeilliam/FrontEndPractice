import React, { createContext, useMemo, useReducer } from 'react'

export const AlertContext = createContext()

// The message reset when action type equal to "CLOSE" and a return funtion is added at Alert()
// to prevent the unlimited re-rendering. This may happened when there is a function, eg: useKBquery,
// which the function cannot be controled to not execute when re-render.

const initialState = {
    type: 'success',
    open: false,
    message: ''
}

const alertReducer = (state, action) => {
    switch (action.type) {
        case 'ALERT': {
            return {
                ...state,
                open: true,
                type: action.alertType,
                message: action.message
            }
        }
        case 'CLOSE':
            return {
                ...state,
                open: false,
                // message: '' // remove the reset of message to prevent unlimited re-rendering.
            }
        default:
            console.log('No action type is match!')
            return {
                ...state
            }
    }
}

export const AlertProvider = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, initialState)

    const store = useMemo(() => ({state, dispatch}), [state.open])

    return <AlertContext.Provider value={store}>{children}</AlertContext.Provider>
}

