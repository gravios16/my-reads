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
    showLoadingMask: false
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = ()  => {
    this.setState(() => ({showLoadingMask: true}))
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books: books,
        showLoadingMask: false
      }))
    })
  }

  changeBookShelf = (book, shelf) => {
    this.setState(() => ({showLoadingMask: true}))
    BooksAPI.update(book, shelf).then( (r) => {
      this.setState(() => ({showLoadingMask: false}))
      this.getBooks()
    })
  }

  render() {
    return (
      <div className="app">

        <div className={this.state.showLoadingMask ? "loading-mask" : "hide"}>
          <div className="loader"></div>
        </div>

        <Route path="/search" render={() => (
          <SearchBook shelfs={this.state.shelfs} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks shelfs={this.state.shelfs} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
