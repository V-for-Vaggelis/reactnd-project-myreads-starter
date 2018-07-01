import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookDisplay from "./BookDisplay"

class SearchBook extends Component {
  state = {
    query: "",
    showingBooks: []
  }
  /*componentDidMount() {
  this.setState({
  showingBooks: []
  })
  }*/

  updateResults = (query) => {
    let trimmedQuery = query.trim()
    if (trimmedQuery) {
      BooksAPI.search(trimmedQuery).then((books) => {
        if (!books || "error" in books) {
          this.setState({
            query: query,
            showingBooks: []
          })
        }
        else {
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
          this.setState({
            query: query,
            showingBooks: books
          })
        }
      })
    }
    else {
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
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
                */}
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
