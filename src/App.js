import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchbooks: [],
    // currentlyReading: [],
    // wantToRead: [],
    // finishedReading: [],
    showSearchPage: false,
  }

  componentDidMount() {
    this.getAllBooks()
  }



  getAllBooks(){
    BooksAPI.getAll()
      .then((data) => {
        this.setState({
          books:data
        })
      })
  }

  onUpdate(bookId, shelf){
    BooksAPI.update(bookId, shelf)
  }

  assign(data){
    if (data === undefined || data.error !== undefined){
      return []
    }
    let shelfBooks = this.state.books
    let ids = shelfBooks.map(book => book.id)
    let C = data.filter(a => !ids.includes(a.id))
    C.forEach((obj => { obj.shelf = "none"; }))

    return C.concat(shelfBooks)

  }

  setDiscovered =(data) => {this.setState({searchbooks:this.assign(data)})}
  discover = (query) =>{BooksAPI.search(query).then(data => this.setDiscovered(data))}
  discover_new = (query) => (query !== undefined) ? this.discover(query):this.setDiscovered([])


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"  onChange={event => {this.discover_new(event.target.value)}}/>

              </div>
            </div>
            <div className="search-books-results">
            <BookList shelf="Search Result" books={this.state.searchbooks}/>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              <BookList shelf="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")} parentMethod={this.someMethod}/>
              <BookList shelf="Want to Read" books={this.state.books.filter(book => book.shelf==="wantToRead")} parentMethod={this.someMethod}/>
              <BookList shelf="Read" books={this.state.books.filter(book => book.shelf === "read")} parentMethod={this.someMethod}/>
            </div>

           
                           
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            <div>
          </div>
          </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
