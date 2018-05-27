import React, { Component } from 'react'

class Book extends Component {
  state = {
    options: [
      { value: "none", text: "Move to...", disabled: true },
      { value: "none", text: "None", disabled: false }
    ]
  }

  getOptions = () => {
    const options = this.state.options
    const shelfs = this.props.shelfs

    let mixedOptions = [].concat(options)

    for (let shelf of shelfs) {
      mixedOptions.push({
        value: shelf.key,
        text: shelf.name,
        disabled: false
      })
    }

    return mixedOptions
  }

  render() {
    const book = this.props.book
    const options = this.getOptions()
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => this.props.changeBookShelf(book, event.target.value)} value={book.shelf}>
              { options.map( (o) => (
                <option
                  key={book.id+"-"+o.text}
                  value={o.value}
                  disabled = { o.disabled ? "disabled" : "" }
                >
                  {o.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(", ")}</div>
      </div>
    )
  }
}

export default Book