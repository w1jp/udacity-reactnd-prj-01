import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as bapi from './BooksAPI'

class SearchBooks extends Component {
  state = {results:[]}

  // methods
  // Search Database
  // This helper function calls the server with the search term. After
  // returning with the search, the results are modified with the shelf
  // state from the parent. The local state is updated with the merged
  // results.
  searchBook(term) {
    bapi.search(term).then(data => {
      data.forEach((book) => {
        const a = this.props.books.filter(e => e.id === book.id)
        if(a.length > 0) book.shelf = a[0].shelf
        else book.shelf = 'none'
      })
      this.setState({results: data})
    })
  }

  // Update book
  // This helper function calls the backend server with modified shelf
  // information. Upon completion, the parent's updateState() is called to
  // update the shelf information and rerender the parent. This could be
  // refactored to leverage the parnt's updateShelf() method instead.
  updateBook(key, shelf) {
    const z = this.state
    z.results[key].shelf=shelf
    bapi.update(z.results[key], shelf).then(()=> {
      this.setState(z)
      this.props.parent.updateState()
    })
  }

  // render
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              placeholder="Search by title or author"
              onChange={(event)=>this.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.results.map((book,key) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={(event) => this.updateBook(key, event.target.value)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{(book.authors)? book.authors.join(', '):'unknown'}</div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
