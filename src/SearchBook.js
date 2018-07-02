import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookDisplay from "./BookDisplay"

class SearchBook extends Component {
  state = {
    query: "",
    showingBooks: []
  }
  // This function will show results directly on query change
  updateResults = (query) => {
    // Clear white spaces before using query to search
    let trimmedQuery = query.trim()
    if (trimmedQuery) {
      BooksAPI.search(trimmedQuery).then((books) => {
        // If we have error repsonse or no results show nothing
        if (!books || "error" in books) {
          this.setState({
            query: query,
            showingBooks: []
          })
        }
        else {//We got results
          // Let's add those books to the shelves they belong
          books.map((b) => {
            for (let shelfBook of this.props.booksOnShelves) {
              if (shelfBook.id === b.id) {
                b["shelf"] = shelfBook.shelf
                return b
              }
            }
            b["shelf"] = "none"
            return b
          })
          this.setState({//update state to show results
            query: query,
            showingBooks: books
          })
        }
      })
    }
    else {//This means user deleted previous query, so show nothing
      this.setState({
        query: "",
        showingBooks: [] })
      }
      return
    }
    render() {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => this.updateResults(e.target.value)}
                />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {/* We use an inline if with the && operator to check if there are any books to render*/}
              {this.state.showingBooks.length > 0 &&
                this.state.showingBooks.map((book) => (
                  <BookDisplay key={book.id} onChangeShelf={this.props.bookMove} bookToShow={book}
                    thumb={book.imageLinks ? book.imageLinks.thumbnail : `http://via.placeholder.com/128x193?text=No%20Cover`} />
                ))}
              </ol>
            </div>
          </div>
        )
      }
    }

    export default SearchBook
