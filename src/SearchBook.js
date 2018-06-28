import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookDisplay from "./BookDisplay"

class SearchBook extends Component {
  state = {
    query: ""
  }
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }
  render() {
    let showingBooks
    if (this.state.query) {
      BooksAPI.search(this.state.query).then((books) => {
        showingBooks = books
        console.log(showingBooks)
      })
    }

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
                onChange={(e) => this.updateQuery(e.target.value)}
                />
            </div>
            {console.log(showingBooks)}
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {console.log(showingBooks)}
              {/* showingBooks.map((book) => (
                <BookDisplay key={book.id} onChangeShelf={this.props.bookMove} bookToShow={book} />
                ))
                */}
              </ol>
            </div>
          </div>
        )
      }
    }

    export default SearchBook
