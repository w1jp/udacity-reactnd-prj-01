import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// BookShelf component is used to render a shelf in the application. It is
// passed the books on the shelf, the title, and the parent object.
class BookShelf extends Component {
  // This component has no local state and uses parent's state.
  // render
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf}
                        onChange={(event) => {
                          // handler to update shelf selection
                          book.shelf=event.target.value
                          this.props.parent.updateShelf(book)
                      }}>
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
      </div>    )
  }
}

export default BookShelf
