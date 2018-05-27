import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './css/App.css'

import ListBooks from './components/ListBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: [
      {key: "currentlyReading", name: "Currently Reading"},
      {key: "wantToRead", name: "Want to Read"},
      {key: "read", name: "Read"}
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <ListBooks shelfs={this.state.shelfs} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
        )}
      </div>
    )
  }
}

export default BooksApp
