export function listsFetchDataSuccess(lists) {
    return {
        type: "LISTS_FETCH_DATA_SUCCESS",
        lists
    }
}

export function listsRemoveDataSuccess(lists) {
    return {
        type: "LISTS_REMOVE_DATA_SUCCESS",
        lists
    }
}

export function listUpdateDataSuccess(lists) {
    return {
        type: "ONE_LIST_UPDATE_DATA_SUCCESS",
        lists
    }
}

export function listsFetchData(url) {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(lists => {
                return dispatch(listsFetchDataSuccess(lists));})
            .catch(()=>{});
    }
}

export function listsRemoveData(url) {
    return (dispatch) => {
        fetch(url, { method: 'DELETE'})
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(lists => {
                dispatch(listsRemoveDataSuccess(lists))
            })
            .catch(()=>{});
    }
}

export function listUpdateData(url, data) {
    return (dispatch) => {
        fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)})
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(lists => {
                dispatch(listsFetchDataSuccess(lists))
            })
            .catch(()=>{});
    }
}

export function listCreateData(url, data) {
    return (dispatch) => {
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)})
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(lists => {
                dispatch(listsFetchDataSuccess(lists))
            })
            .catch(()=>{});
    }
}