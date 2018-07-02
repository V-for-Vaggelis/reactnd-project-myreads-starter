import React, { Component } from 'react'
import BookDisplay from "./BookDisplay"

function ShelfDisplay (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <BookDisplay key={book.id} onChangeShelf={props.bookMove} bookToShow={book}
              thumb={book.imageLinks ? book.imageLinks.thumbnail : `http://via.placeholder.com/128x193?text=No%20Cover`}/>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default ShelfDisplay
