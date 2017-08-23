import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
    this.updateShelf=this.updateShelf.bind(this)
  }

  updateState() {
    const z = {currentlyReading:[], wantToRead:[], read:[]}

    BooksAPI.getAll().then(data => {
      data.forEach(book => z[book.shelf].push(book))
      this.setState(z)
    })
  }

  componentDidMount(){
    this.updateState()
  }

  updateShelf(book) {
    BooksAPI.update(book, book.shelf).then(()=>{
      this.updateState()
    })
  }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks />
          )}/>
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title='Currently Reading'
                    books={this.state.currentlyReading}
                    update={this.updateShelf}
                  />
                  <BookShelf
                    title='Want to Read'
                    books={this.state.wantToRead}
                    update={this.updateShelf}
                  />
                  <BookShelf
                    title='Read'
                    books={this.state.read}
                    update={this.updateShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
