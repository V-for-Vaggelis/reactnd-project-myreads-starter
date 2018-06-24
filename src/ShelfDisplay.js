import React, { Component } from 'react'
import BookDisplay from "./BookDisplay"

function ShelfDisplay (props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book) => (
            <BookDisplay bookToShow={book} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default ShelfDisplay
