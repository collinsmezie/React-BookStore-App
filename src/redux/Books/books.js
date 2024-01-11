const ADD_BOOK = 'ADD_BOOK';
const REMOVE_BOOK = 'REMOVE_BOOK';
const FETCH_BOOKS = 'FETCH_BOOKS';
const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';
const FETCH_BOOKS_LOADING = 'FETCH_BOOKS_LOADING';
const EDIT_BOOK = 'EDIT_BOOK';

// const URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/zb4rRKmTdPu5hEXD41Ox/books';
// const URL = 'https://hngx-7zpk.onrender.com/api/books';
const URL = 'http://localhost:3000/api/books';

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

export const editBook = (book) => ({
  type: EDIT_BOOK,
  payload: book,
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
            id: key.id,
          });
        }
      });
      dispatch(fetchBooks(newBooks));
    })
    .catch((error) => {
      dispatch(fetchBooksError(error.message));
    });
};

export const postBook = (book) => (dispatch) => {
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
    .then(() => {
      dispatch(addBook(book));
    });
};

export const deleteBook = (id) => (dispatch) => {
  fetch(`${URL}/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
    .then(() => {
      dispatch(removeBook(id));
    });
};

export const updateBook = (book) => (dispatch) => {
  fetch(`${URL}/${book.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
    .then(() => {
      dispatch(editBook(book));
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

    case EDIT_BOOK:
      return {
        ...state,
        loading: false,
        books: state.books.map((book) => {
          if (book.id === action.payload.id) {
            return {
              ...book,
              title: action.payload.title,
              author: action.payload.author,
              category: action.payload.category,
              current_chapter: action.payload.current_chapter,
              progress: action.payload.progress,
            };
          }
          return book;
        }),
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
