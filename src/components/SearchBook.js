import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

import * as BooksAPI from './../utils/BooksAPI'

class SearchBook extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchBooks: []
  }

  updateQuery = (query)  => {
    if (query.trim() !== "") {
      this.searchBook(query)
      this.setState(() => ({
        query: query
      }))
    } else {
      this.setState(() => ({
        searchBooks: [],
        query: ''
      }))
    }
  }

  searchBook = (query) => {
    BooksAPI.search(query)
    .then((response) => {
      let books = (response.error) ? response.items : response
      this.setState(() => ({
        searchBooks: books
      }))
    })
  }

  render() {
    const { searchBooks, query } = this.state
    const { changeBookShelf, shelfs, books } = this.props

    const showingBooks = query === "" ? [] : searchBooks.map((searchBook) => {
      for (let book of books) {
        if (searchBook.id === book.id) {
          return book
        }
      }
      return searchBook
    })

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map( (book) => (
              <li key={book.id}>
                <Book book={book} shelfs={shelfs} changeBookShelf={changeBookShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
