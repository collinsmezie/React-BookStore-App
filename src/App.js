import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/Routes/BookList';
import Categories from './components/Routes/Categories';
import NewBook from './components/Routes/NewBook';
import EditBook from './components/Routes/EditBook';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" index element={<BookList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/newbook" element={<NewBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
