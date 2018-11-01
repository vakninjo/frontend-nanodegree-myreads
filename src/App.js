import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './components/BookCase'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
  }

  //After mount update data
  componentDidMount = () => {
      this.updateAllBooks();
  }

  updateAllBooks = () => {
    //Get books on bookshekves and update state
    BooksAPI
      .getAll()
      .then((list) => {
        this.setState({
          books: list
        })
      })

  }

  changeShelf = (book, shelf) => {
    //Call to backend and update shelf for the selected book
    BooksAPI
      .update(book, shelf)
      .then((response) =>{
        //create new list of books

        let newList = this.state.books.slice(0);

        // look for book in newList
        const books = newList.filter(listBook => listBook.id === book.id);
        if (books.length) {
          books[0].shelf = shelf;
        } else {
          newList.push(book);
        }
        //update state with newList
        this.setState({books: newList});
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render = {() => (
            <BookCase
              books={this.state.books}
              onUpdateAllBooks={this.updateAllBooks}
              onChangeShelf = {this.changeShelf}
            />
          )}
        />
        <Route path = '/search' render ={() => (
            <Search
              allBooks = {this.state.books}
              onUpdateAllBooks={this.updateAllBooks}
              onChangeShelf = {this.changeShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
