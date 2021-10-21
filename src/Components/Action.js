export function getBooks() {
    return dispatch => {
        return dispatch({
            type: "GET_BOOKS"
        });
    }
};

export function addBooks(data) {
    return dispatch => {
        return dispatch({
            type: "ADD_BOOKS",
            payload: data
        });
    }
};

export function editBooks(data) {
    return dispatch => {
        return dispatch({
            type: "EDIT_BOOKS",
            payload: data
        });
    }
};

export function deleteBooks(bookId) {
    return dispatch => {
        return dispatch({
            type: "DELETE_BOOKS",
            payload: bookId
        });
    }
};