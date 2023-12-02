
import React, { useEffect, useState } from 'react'
import './loading.css'

function Loading({ text }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const counter = setInterval(() => {
            setCount(prev => prev + 1)
        }, 1000)

        return () => clearInterval(counter)
    },[])

    const wavingText = () =>
        [...text].map((t, index) => (
            <span style={{ '--i': index }} key={index+t}>
                {t}
            </span>
        ))

    return (
        <div className="m-auto flex flex-col items-center justify-center ">
            <div className="lds-roller">
                <div key={1}/>
                <div key={2}/>
                <div key={3}/>
                <div key={4}/>
                <div key={5}/>
                <div key={6}/>
                <div key={7}/>
                <div key={8}/>
            </div>

            {text &&
            <div className='flex flex-wrap center'>
                <div className="waveText pl-6">{wavingText()}</div>
                <span className='px-2'>{count}</span>
            </div>}
        </div>
    )
}

export default Loading
