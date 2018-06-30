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
    if (query) {
      BooksAPI.search(query).then((books) => {
        // Let's add those books to the shelves they belong
        const shelvedBooks = books.map((book) => {
          for (let shelfBook of this.props.booksOnShelves) {
            if (shelfBook.id === book.id) {
              book["shelf"] = shelfBook.shelf
              return book
            }
          }
          book["shelf"] = "none"
          return book;
        })
        this.setState({
          query: query.trim(),
          showingBooks: shelvedBooks
        })
      })
    }
    else {
      this.setState({
        query: "",
        showingBooks: [] })
      }

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
                  value={this.state.query}
                  onChange={(e) => this.updateResults(e.target.value)}
                  />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {/* We use an inline if in React with the && operator*/}
                {this.state.showingBooks.length > 0 &&
                  this.state.showingBooks.map((book) => (
                    <BookDisplay key={book.id} onChangeShelf={this.props.bookMove} bookToShow={book} />
                  ))}
                </ol>
              </div>
            </div>
          )
        }
      }

      export default SearchBook
