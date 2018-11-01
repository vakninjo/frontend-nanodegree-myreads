import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI'
import '../App.css'

class Search extends Component {

    state = {
      query: "",
      bookSearchList: []
    }

    //After mount update data
    //This is to deal with forcefull browseing and page refresh
    componentDidMount = () => {
      this.props.onUpdateAllBooks();
    }


    updateQuery = (value) => {
      //update the query and execute the search

      this.setState({query: value}, this.searchBooks);
      // setTimeout(this.searchBooks(), 250);
    }

    searchBooks = () => {
      //No search on empty query
      if (this.state.query.trim() === ""){
        this.setState({bookSearchList:[]});
        return;
      }
      //Run search on the query string
      BooksAPI
        .search(this.state.query.trim())
        .then((response) =>{
          let newList = [];
          console.log(response);
          //Search returns results
          if (response === undefined || (response.error && response.error !== 'empty query')){
            console.log(response);

          } else if (response.length) {
            newList = response;
          }

          this.setState({bookSearchList: newList})
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                          type="text"
                          placeholder="Search by title or author"
                          value={this.state.query.value}
                          onChange = {(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                      {this.state.bookSearchList.map(book => (
                          <li key = {book.id}>
                            <Book
                              book= {book}
                              onChangeShelf = {this.props.onChangeShelf}
                             />
                          </li>
                        ))
                      }

                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;
