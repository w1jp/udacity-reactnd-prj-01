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
  }

  // updateState()
  // This helper function is used by the App and its children to update
  // the state of the application and rerender the UI.
  updateState() {
    const z = {currentlyReading:[], wantToRead:[], read:[]} // reset state
    BooksAPI.getAll().then(data => {
      data.forEach(book => z[book.shelf].push(book))
      this.setState(z)
    })
  }

  // componentDidMount()
  // This function calls updateState() to fetch the books from the backend server
  componentDidMount(){
    this.updateState()
  }


  // updateShelf()
  // This is a helper function to update a book on the backed server
  updateShelf(book) {
    BooksAPI.update(book, book.shelf).then(()=>{
      this.updateState()  // update the local state to force render()
    })
  }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks
              books={[
                ...this.state.currentlyReading,
                ...this.state.wantToRead,
                ...this.state.read
              ]}
              parent={this} 
            />
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
                    parent={this}
                  />
                  <BookShelf
                    title='Want to Read'
                    books={this.state.wantToRead}
                    parent={this}
                  />
                  <BookShelf
                    title='Read'
                    books={this.state.read}
                    parent={this}
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
