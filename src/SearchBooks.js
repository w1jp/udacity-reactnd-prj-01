import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as bapi from './BooksAPI'

class SearchBooks extends Component {
  state = {}

  // methods
  componentDidMount() {
    bapi.getAll().then(data =>this.setState({books: data}))
    bapi.get("nggnmAEACAAJ").then(data => this.setState({book: data}))
    const auth = "Art"
    bapi.search(auth).then(data => this.setState({rslt: data}))
  }
  // render
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
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
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <code>JSON see debugger</code>
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
