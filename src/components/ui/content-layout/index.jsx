import React, { Children } from 'react'
import { FloatInput as Input } from '../input'

// import NavigationIcon from '@mui/icons-material/Navigation'
// import IconButton from '@mui/material/IconButton'
// import Tooltip from '@mui/material/Tooltip'

//add id in case muli-content in same page would case key duplicate issue
const Content = ({ id, children, navigation, navigationTarget='content' }) => {
    const header = Children.map(children, (child) => (child.type.displayName === 'Content-Header' ? child : null))
    const body = Children.map(children, (child) => (child.type.displayName === 'Body' ? child : null))
    const searchBar = Children.map(children, (child) => (child.type.displayName === 'Search-Bar' ? child : null))
    const rest = Children.map(children, (child) =>
        child.type.displayName !== 'Content-Header' && child.type.displayName !== 'Body' && child.type.displayName !== 'Search-Bar' ? child : null
    )

    return (
        <div id={id} className={'flex h-full w-[100%] flex-col'}>
            {/* {header}
            {searchBar}
            {body}
            {rest}
            {navigation && (
                <Tooltip title="Back to top">
                    <IconButton
                        aria-label="back to top"
                        variant="contained"
                        size="large"
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20
                        }}
                        color="primary"
                        className="dark:bg-white dark:hover:bg-white"
                        onClick={() => {
                            document.getElementById(navigationTarget).scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                    >
                        <NavigationIcon />
                    </IconButton>
                </Tooltip>
            )} */}
        </div>
    )
}

const SearchBar = ({ placeholder, label, clear, download, onKeywordSearch, name }) => {
    return (
        <div className="w-full py-2">
            <div className="flex w-full gap-2">
                <div className="peer relative  flex h-full w-full flex-wrap">
                    <Input
                        placeholder={placeholder}
                        label={label}
                        onChange={onKeywordSearch}
                        iconClass="bx bx-sm bx-search"
                        name={name}
                    />
                    {/* <input
                        type="text"
                        // onChange={(e) => setKeyword(e.target.value)}
                        // ref={keywordRef}
                        className="peer h-full w-full border-b-2 border-b-slate-300 bg-white pl-6 pr-3  placeholder:italic placeholder:text-slate-400 focus:rounded-md focus:border-2 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:placeholder:not-italic focus:placeholder:text-slate-600 sm:text-sm"
                        placeholder="Enter search keywords separated by comma."
                        onChange={onKeywordSearch}
                    /> */}
                    {/* <button onClick={onKeywordSearch}>
                        <span className="absolute inset-y-0 right-1 flex items-center pl-2 text-gray-400 hover:text-black">
                            <i className="bx bx-sm bx-search" />
                        </span>
                    </button> */}
                </div>

                {clear && (
                    <button
                        id="popover-button"
                        type="button"
                        onClick={clear}
                        className="w-10 rounded border-2 border-gray-200 hover:bg-orange-400 hover:text-white active:ring-2 active:ring-blue-500"
                    >
                        <i className="bx bx-x"></i>
                        <div id="popover" className="relative mb-2 inline-block">
                            <div
                                id="popover_content"
                                className="invisible absolute -translate-x-[70%] -translate-y-12 rounded-md border-2 bg-white px-2 text-xs opacity-0 transition-all"
                            >
                                Clear
                            </div>
                        </div>
                    </button>
                )}

                {download && (
                    <button
                        id="popover-button"
                        type="button"
                        className="w-10 rounded border-2 border-gray-200 hover:bg-green-400 hover:text-white active:ring-2 active:ring-blue-500"
                    >
                        <i className="bx bxs-download"></i>
                        <div id="popover" className="relative mb-2 inline-block">
                            <div
                                id="popover_content"
                                className="invisible absolute -translate-x-[60%] -translate-y-16 rounded-md border-2 bg-white px-2 text-xs opacity-0 transition-all"
                            >
                                Download Result
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </div>
    )
}

/**
 * Define Header Section of Content
 */
const Header = ({ children, title }) => {
    return (
        <div  className="my-2 flex h-16 items-center py-4 flex-col">
            <h3 className="text-2xl font-bold text-start mb-4 border-b dark:border-white w-full">{title}</h3>
            {children}
        </div>
    )
}

/**
 * Define Body Section of Content
 */
const Body = ({ children }) => {
    // get header height to dset body height padding, use 2rem as default to prevent if header is not render
    // const headerHight = document.getElementById('content-header')
    //     ? document.getElementById('content-header').clientHeight
    //     : '2rem';
    // no need if given it an overflow as well as it's content has set overflow

    return (
        <div className={'w-full'}>
            {children}
        </div>
    )
}

Header.displayName = 'Content-Header'
Body.displayName = 'Body'
SearchBar.displayName = 'Search-Bar'

Content.Header = Header
Content.Body = Body
Content.SearchBar = SearchBar

export default Content
