/**
 * 排序方法
 * @param {*} results 
 * @param {*} sortBy 
 * @param {*} sortOrder 
 * @returns 
 */
export const sortResults = (results, sortBy, sortOrder) => {
    return results.sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (!isNaN(aValue) && !isNaN(bValue)) {
            aValue = +aValue;
            bValue = +bValue;
        }

        if (sortOrder === 'asc') {
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        } else { // 'desc'
            if (aValue > bValue) return -1;
            if (aValue < bValue) return 1;
            return 0;
        }
    });
};

/**
 * 模擬 loading 畫面
 * @param {*} setIsLoading 
 * @param {*} setShowResult 
 * @param {*} delay 
 */
export const simulateLoading = (options = {}) => {
    const { delay = 1000, ...stateUpdates } = options;

    setTimeout(() => {
        Object.values(stateUpdates).forEach(updateFunc => {
            if (typeof updateFunc === 'function') {
                updateFunc();
            }
        });
    }, delay);
};