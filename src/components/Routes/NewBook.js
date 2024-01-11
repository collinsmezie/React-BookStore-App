import React from 'react';
import { generate } from 'randomized-string';
import { useDispatch } from 'react-redux';
import { postBook } from '../../redux/Books/books';
import './scss/Style.scss';

const NewBook = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, category, current_chapter, progress } = e.target.elements;
    const newBook = {
      id: generate(),
      title: title.value,
      author: author.value,
      category: category.value,
      current_chapter: current_chapter.value,
      progress: progress.value
    };
    dispatch(postBook(newBook));
    e.target.reset();
  };

  return (
    <div className="d_flex_c container bookForm">
      <h2>NEW BOOK</h2>
      <form className="d_flex_r" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="author" placeholder="Author" required />
        <input type="text" name="category" placeholder="Category" required />
        <input type="text" name="current_chapter" placeholder="Ex. Chapter 1: Foggy Ideas" required />
        <input type="number" name="progress" placeholder="Progress (%)" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewBook;
