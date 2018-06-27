import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ShelfDisplay from './ShelfDisplay'
import { Link } from 'react-router-dom'

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
  removeBook = (book) => {
    this.setState((state) => ({
      books: this.state.books.filter((b) => b.id !== book.id),
      showSearchPage: false
    }))
  }

  showHomePage = () => {
    this.setState({ showSearchPage: false })
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBook onBack={this.showHomePage}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfDisplay bookRemove={this.removeBook} shelfName="Currently reading" books={this.state.books.filter((book) => book.shelf === "currentlyReading")} />
                <ShelfDisplay bookRemove={this.removeBook} shelfName="Want to read" books={this.state.books.filter((book) => book.shelf === "wantToRead")} />
                <ShelfDisplay bookRemove={this.removeBook} shelfName="Read" books={this.state.books.filter((book) => book.shelf === "read")} />
              </div>
            </div>
            <div className="open-search">
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}


export default BooksApp
