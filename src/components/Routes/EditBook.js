import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateBook } from '../../redux/Books/books';
import './scss/Style.scss';

const EditBook = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { id } = useParams();
  const book = books.find((book) => book.id === id);
  const { title, author, category, current_chapter, progress } = book;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, category, current_chapter, progress } = e.target.elements;
    const editedBook = {
      title: title.value,
      author: author.value,
      category: category.value,
      current_chapter: current_chapter.value,
      progress: progress.value,
      id,
    };

    dispatch(updateBook(editedBook));
    // Clear form values
    title.value = '';
    author.value = '';
    category.value = '';
    current_chapter.value = '';
    progress.value = '';
  };

  return (
    <div className="d_flex_c container bookForm">
      <h2>EDIT BOOK</h2>
      <form className="d_flex_r" onSubmit={handleSubmit}>
        {/* Use defaultValue instead of placeholder for input values */}
        <input type="text" placeholder="Title" name="title" defaultValue={title} required />
        <input type="text" placeholder="Author" name="author" defaultValue={author} required />
        <input type="text" placeholder="Category" name="category" defaultValue={category} required />
        <input type="text" placeholder="Current Chapter" name="current_chapter" defaultValue={current_chapter} required />
        <input type="number" placeholder="Progress (%)" name="progress" defaultValue={progress} required />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditBook;
