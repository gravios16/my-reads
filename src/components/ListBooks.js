import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  }

  state = {}

  groupBooksByShelf = () => {
    const { books, shelfs } = this.props

    let groupedByShelfs = shelfs.map( (shelf) => {

      let filterBooks = books.filter( (book) => ( book.shelf === shelf.key ) )

      return Object.assign( { books: filterBooks }, shelf )

    })

    return groupedByShelfs
  }


  render() {
    const shelfs = this.props.shelfs
    const booksByShelf = this.groupBooksByShelf()

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              booksByShelf.map(shelf => (
                <div key={shelf.key} className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelf.books.map( (book) => (
                          <li key={book.id}>
                            <Book book={book} shelfs={shelfs} changeBookShelf={this.props.changeBookShelf}/>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
