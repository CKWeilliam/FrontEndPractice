import React, { useState } from 'react'
import { Input } from '../../../components/ui'

const SearchBar = (props) => {

    const [searchKeywords, setSearchKeywords] = useState('')

    const handleChange = (e) => {
        const value = e.target.value
        setSearchKeywords(value)

        props.onSearch(value)
    }
    // console.log(searchKeywords)
    // const handleSearchResult  = (e) => {
    //     setSearchKeywords(e.target.value)
    //     props.onSearch(searchKeywords)
    // }

    return (
        <div className='row items-center p-2'>
            <div className='w-full flex items-center gap-4'>
                <Input id='test' name='test' value={searchKeywords} onChange={handleChange}/>
                <button className='button button-primary h-8'>Search</button>
                <button className='button button-danger h-8'>Clear</button>
                <button className='button button-success h-8'>Download</button>
                <button className='button button-success h-8'>Switch</button>
            </div>
            <div className='w-full flex gap-4'>
                <p>Founded result:</p>
            </div>
        </div>
    )
}

export default SearchBar