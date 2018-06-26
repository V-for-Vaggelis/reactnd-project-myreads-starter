import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ShelfDisplay from './ShelfDisplay'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
    * TODO: Instead of using this state variable to keep track of which page
    * we're on, use the URL in the browser's address bar. This will ensure that
    * users can use the browser's back and forward buttons to navigate between
    * pages, as well as provide a good URL they can bookmark and share.
    */
    showSearchPage: false
  }
  // This will ensure the shelved books are pulled from the server
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfDisplay shelfName="Currently reading" books={this.state.books.filter((book) => book.shelf === "currentlyReading")} />
                <ShelfDisplay shelfName="Want to read" books={this.state.books.filter((book) => book.shelf === "wantToRead")} />
                <ShelfDisplay shelfName="Read" books={this.state.books.filter((book) => book.shelf === "read")} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}


export default BooksApp
