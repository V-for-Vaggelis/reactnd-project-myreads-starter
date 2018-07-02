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
  // Get initial set of books from server
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  updateBookShelf = (book, val) => {
    // Check if the book to updated is already shelved
    let match = false
    for (let b of this.state.books) {
      if (b.id === book.id) {
        match = true
      }
    }
    BooksAPI.update(book, val).then(() => {
      if (match === true) {
        if (val === "none") {//If it is shelved, and selected values is none, remove it
          this.setState((state) => ({
            books: state.books.filter((b) => b.id !== book.id)
          }))
        }
        else {//Else move it to the selected shelf
          this.setState((state) => ({
            books: state.books.map((b) => {
              if (b.id === book.id) {
                b.shelf = val}
                return b
              })
            }))
          }
        }
        else {//If it wasn't shelved, add it to the books of state
          this.setState((state) => ({
            books: state.books.concat([book])
          }))
        }
      }).then(BooksAPI.getAll().then((books) => {//After the changes, update the state to show books with new changes
        this.setState({ books })
      }))
    }
    render() {
      return (
        <div className="app">
          {/* Use exact path so that it isn't partly matched and create problems*/}
          <Route exact path='/' render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <ShelfDisplay bookMove={this.updateBookShelf} shelfName="Currently reading"
                      books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                      />
                    <ShelfDisplay bookMove={this.updateBookShelf} shelfName="Want to read"
                      books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                       />
                    <ShelfDisplay bookMove={this.updateBookShelf} shelfName="Read"
                      books={this.state.books.filter((book) => book.shelf === "read")}
                       />
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
            )}/>
            <Route path='/search' render={({history}) => (
                <SearchBook bookMove={(b, shelf) => {
                    this.updateBookShelf(b, shelf)
                    {/* On changing shelf to a searched book, we get re-directed to the home page*/}
                    history.push("/")}} booksOnShelves={this.state.books}/>
                )}/>
              </div>
            )
          }
        }


        export default BooksApp
