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
            type: "ADD_BOOKS"
        });
    }
};

export function editBooks(data) {
    return dispatch => {
        return dispatch({
            type: "EDIT_BOOKS"
        });
    }
};

export function deleteBooks() {
    return dispatch => {
        return dispatch({
            type: "DELETE_BOOKS"
        });
    }
};