import React from 'react'
import { Route } from 'react-router-dom'

import ListBooks from './components/ListBooks'
import SearchBook from './components/SearchBook'

import * as BooksAPI from './utils/BooksAPI'
import './css/App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: [
      { key: "currentlyReading", name: "Currently Reading" },
      { key: "wantToRead", name: "Want to Read" },
      { key: "read", name: "Read" }
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = ()  => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books: books
      }))
    })
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then( (r) => {
      this.getBooks()
    })
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={() => (
          <SearchBook/>
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks shelfs={this.state.shelfs} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
