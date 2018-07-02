import React, { Component } from 'react'

function BookDisplay (props) {
  let divStyle = {
    width: 128,
    height: 192,
    backgroundImage: `url(${props.thumb})`
  }
  // This function will add a check to the book's active shelf
  let checkValue = (val) => {
    if (val === props.bookToShow.shelf) {
      // In React we can't insert unicodes with their html code so we use C/C++/Java code
      return " \u2705 "
    }
    else {
      return
    }
  }
  // This will make sure books with multiple authors display the names well
  let showAuthors = () => {
    if (props.bookToShow.authors) {
      let length = props.bookToShow.authors.length
      let lastAuthor = props.bookToShow.authors[length-1]
      let authors = props.bookToShow.authors.map((author) => {
        if (author === lastAuthor) {
          return author
        }
        else {
          // Seperate multiple author by ","
          return author + ", "
        }
      })
      return authors
    }
    else {
      // Return this if there are no authors
      return "-"
    }
  }
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={divStyle}></div>
          <div className="book-shelf-changer">
            <select defaultValue={props.bookToShow.shelf} onChange={(e) => props.onChangeShelf(props.bookToShow, e.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading {checkValue("currentlyReading")}</option>
              <option value="wantToRead">Want to Read {checkValue("wantToRead")}</option>
              <option value="read">Read {checkValue("read")}</option>
              <option value="none">None {checkValue("none")}</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.bookToShow.title}</div>
        <div className="book-authors">{showAuthors()}</div>
      </div>
    </li>
  )
}

export default BookDisplay
