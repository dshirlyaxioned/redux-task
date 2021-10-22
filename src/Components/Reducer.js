import data from '../Util/Data.js';

const reducer = (state = data, action) => {
    switch(action.type) {
        case 'GET_BOOKS':
            return {
                ...state
            };
        case 'ADD_BOOKS':
            return {
                ...state,
                books: state.books.concat(action.payload)
            };
        case 'EDIT_BOOKS':
            return {
                ...state,
                books: state.books.map(
                    (content, i) => 
                        content.id === action.payload.id ? {...content, title: action.payload.title, category: action.payload.category, publishDate: action.payload.publishDate, author: action.payload.author} 
                        : content)
            };
        case 'DELETE_BOOKS':
            return {
                ...state,
                books: state.books.filter(item => item.id !== action.payload)  
            };
        default:
            return state;       
    }
}

export default reducer;