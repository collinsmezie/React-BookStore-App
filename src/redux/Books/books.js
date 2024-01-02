const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const FETCH_BOOKS = 'FETCH_BOOKS';
const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';
const FETCH_BOOKS_LOADING = 'FETCH_BOOKS_LOADING';
// const URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/zb4rRKmTdPu5hEXD41Ox/books';
const URL = 'https://hngx-7zpk.onrender.com/api/books'
// const URL = 'http://localhost:4000/api/books'


export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: book,
});

export const removeBook = (id) => ({
  type: REMOVE_BOOK,
  payload: id,
});

export const fetchBooks = (books) => ({
  type: FETCH_BOOKS,
  payload: books,
});

export const fetchBooksError = (error) => ({
  type: FETCH_BOOKS_ERROR,
  payload: error,
});

export const fetchBooksLoading = () => ({
  type: FETCH_BOOKS_LOADING,
});

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export const getBooks = () => (dispatch) => {
  dispatch(fetchBooksLoading());
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const newBooks = [];
      data.forEach((key) => {
        if (key) {
          newBooks.push({
            title: key.title,
            author: key.author,
            category: key.category,
            current_chapter: key.current_chapter,
            progress: key.progress,
            id: key._id,
          });
        }
        console.log('NEWBOOKS',newBooks);
      });
      dispatch(fetchBooks(newBooks));
    })
    .catch((error) => {
      dispatch(fetchBooksError(error.message));
    });
};


export const postBook = (book) => (dispatch) => {
  console.log('Inside post book now', book);
  
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
  .then(() => {
    dispatch(addBook(book));
  })
  .catch((error) => {
    console.error('Error posting data:', error);
    // You might dispatch an action to handle the error state in your Redux store
  });
};


export const deleteBook = (id) => (dispatch) => {
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ item_id: id }),
  })
    .then(() => {
      dispatch(removeBook(id));
    });
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_BOOK:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload],
      };
    case REMOVE_BOOK:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case FETCH_BOOKS:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case FETCH_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
