import React from 'react'

const CircleChart = ({radius=30, percentage, text, color='text-sky-400', bgColor='text-gray-300'}) => {
    let circumference = 2 * Math.PI * radius
    let offset =  circumference - percentage / 100 * circumference
    let fontsize = 'text-base'
    
    if (radius <= 30) fontsize = 'text-xs'
    else if (radius >=50) fontsize = 'text-lg'
    else if (radius >=70) fontsize = 'text-xl'
    else if (radius > 70)  fontsize = 'text-2xl'

    return (
        <div className='flex center'>
            <svg className="transform -rotate-90">
                <circle 
                    cx="50%" 
                    cy="50%" 
                    r={radius} 
                    stroke="currentColor" 
                    strokeWidth="6" fill="transparent" 
                    strokeDasharray={circumference}
                    className={bgColor} />

                <circle  
                    cx="50%" 
                    cy="50%"  
                    r={radius} 
                    stroke="currentColor" 
                    strokeWidth="6" fill="transparent" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={offset}
                    className={color}/>
            </svg>
            <span className={`absolute ${fontsize}`}>
                {(text && radius >= 25) && text+ ' '}{percentage && percentage + '%' }</span>
        </div>
    )
}

export default CircleChart