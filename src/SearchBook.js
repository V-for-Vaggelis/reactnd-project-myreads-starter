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
      const { booksOnShelves, bookMove } = this.props
      const { showingBooks, query } = this.state
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to={`${process.env.PUBLIC_URL}/`} className="close-search">Close</Link>
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
              {/* We use ternary operator to check if there are any books to render*, if there are not we use inline if (&&), to print message*/}
              {showingBooks.length > 0 ?
                showingBooks.map((book) => (
                  <BookDisplay key={book.id} onChangeShelf={bookMove} bookToShow={book}
                    thumb={book.imageLinks ? book.imageLinks.thumbnail : `http://via.placeholder.com/128x193?text=No%20Cover`} />
                )) :
                (query.length > 0) &&
                <li> No books match your search query! </li>
              }
            </ol>
          </div>
        </div>
      )
    }
  }

  export default SearchBook
