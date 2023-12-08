import { useContext, useState } from 'react'
import { AlertContext } from '../context/Alert'
import useTimeout from './useTimeout'

export const useAlert = () => {
    const { state, dispatch } = useContext(AlertContext)
    const [timeout, setTimeout] = useState(2000)
    const { reset, clear } = useTimeout(closeAlert, timeout)

    if (state === undefined) {
        throw new Error('useAlert must be used within a AlertContext')
    }

    function Alert(type, message, time) {
        // if(message === state.message) return //add return to prevent unlimited re-rendering
        if (time) setTimeout(time)
        else setTimeout(2000)

        if (state.open) {
            document.getElementById('alert').classList.remove('active')
        }
        document.getElementById('alert').classList.add('active')

        dispatch({
            type: 'ALERT',
            alertType: type,
            message
        })

        reset()
    }

    function closeAlert() {
        const element = document.getElementById('alert')
        if (element) {
            element.classList.remove('active')
        }

        dispatch({
            type: 'CLOSE'
        })
        clear()
    }

    return {
        type: state.type,
        message: state.message,
        closeAlert,
        Alert,
        state,
        dispatch
    }
}

export default useAlert
