import React, { Component } from 'react'
import BookDisplay from "./BookDisplay"

class ShelfDisplay extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <BookDisplay key={book.id} onChangeShelf={this.props.bookMove} bookToShow={book}
                thumb={book.imageLinks ? book.imageLinks.thumbnail : `http://via.placeholder.com/128x193?text=No%20Cover`}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ShelfDisplay
