import React, { useState } from 'react'; 

const Sort_Result = ({ sortOrder, setSortOrder, sortBy, setSortBy }) => {

    return (
        <div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="centered-select  mr-4">
                <option value="part_no" className="centered-option">Part No</option>
                <option value="part_type" className="centered-option">Part Type</option>
            </select>
            <button className='button button-primary h-8 w-16 large-text' onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? '升序' : '降序'}
            </button>
        </div>
    )
}

export default Sort_Result