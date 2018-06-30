import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ShelfDisplay from './ShelfDisplay'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  // This will ensure the shelved books are pulled from the server
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  updateBookShelf = (book, val) => {
    BooksAPI.update(book, val).then(() => {
      if (val === "none") {
        this.setState((state) => ({
          books: this.state.books.filter((b) => b.id !== book.id)
        }))
      }
      else {
        this.setState((state) => ({
          books: this.state.books.map((b) => {
            if (b.id === book.id) {
              b.shelf = val}
              return b;
            })
          }))
        }
      })
    }
    render() {
      return (
        <div className="app">
          <Route exact path='/' render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <ShelfDisplay bookMove={this.updateBookShelf} shelfName="Currently reading" books={this.state.books.filter((book) => book.shelf === "currentlyReading")} />
                    <ShelfDisplay bookMove={this.updateBookShelf} shelfName="Want to read" books={this.state.books.filter((book) => book.shelf === "wantToRead")} />
                    <ShelfDisplay bookMove={this.updateBookShelf} shelfName="Read" books={this.state.books.filter((book) => book.shelf === "read")} />
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
            )}/>
          <Route path='/search' render={({history}) => (
                <SearchBook bookMove={() => {
                    history.push("/")
                    return this.updateBookShelf}} booksOnShelves={this.state.books}/>
                )}/>
              </div>
            )
          }
        }


        export default BooksApp
