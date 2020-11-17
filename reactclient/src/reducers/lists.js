export function lists (state = [], action) {
    switch (action.type) {
        case "LISTS_FETCH_DATA_SUCCESS":
            return action.lists;
        case 'LISTS_REMOVE_DATA_SUCCESS':
            return action.lists;
        case 'ONE_LIST_UPDATE_DATA_SUCCESS':
            return action.lists;
        default:
            return state;
    }
}