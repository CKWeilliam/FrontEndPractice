import React from 'react'
import { Container } from '@mui/material'
import UploadForm from './components/Upload3rdPartyForm.jsx'
import SearchSbomForm from './components/SearchSbomFrom.jsx'
import About from './components/About.jsx'



const ThirdPartyPackage = () => {
    console.log(' ThirdPartyPackage')
    return (
        <Container style={{ '& *': { boxSizing: 'border-box' } }}>
            <div className="m-4 border-b-2">
                <h1 className="text-2xl font-bold text-start mb-4 dark:border-white w-full flex items-center">Third Party Files
                    {/* <About /> */}
                </h1>
            </div>
            <UploadForm />
            <SearchSbomForm />
        </Container>
    )
      
}

export default ThirdPartyPackage