import { icons } from 'lucide-react'
import React from 'react'

const Lucide = ({ name, color, size}) => {
    const LucideIcon = icons[name]// eslint-disable-line import/namespace

    return <LucideIcon color={color} size={size} />
}

export default Lucide