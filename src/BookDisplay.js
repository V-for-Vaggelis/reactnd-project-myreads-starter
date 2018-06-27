import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

function BookDisplay (props) {
  let divStyle = {
    width: 128,
    height: 192,
    backgroundImage: "url(" + props.bookToShow.imageLinks.thumbnail + ")"
  };
return (
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={divStyle}></div>
        <div className="book-shelf-changer">
          <select onChange={(e) => props.onChangeShelf(props.bookToShow, e.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.bookToShow.title}</div>
      <div className="book-authors">{props.bookToShow.authors}</div>
    </div>
  </li>
)
}

export default BookDisplay
