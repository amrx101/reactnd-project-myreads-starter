import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import './App.css'





class BooksApp extends React.Component {
  constructor(){
    super();
  this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchbooks: [],
    currentlyReading: [],
    wantToRead: [],
    finishedReading: [],
    showSearchPage: false,
    key: ""
  }
  this.discover = this.discover.bind(this)
}

  componentDidMount() {
    this.getAllBooks()
  }


  getAllBooks() {
  let self = this;
  BooksAPI.getAll().then(
    function(data){
      self.setState({
        currentlyReading: data.filter(book => book.shelf === "currentlyReading"),
        wantToRead: data.filter(book => book.shelf === "wantToRead"),
        finishedReading: data.filter(book => book.shelf === "read")
      })
    }
  )
}

onUpdate(bookId, shelf){
  BooksAPI.update(bookId, shelf)
}


setDiscovered =(data) => {this.setState({searchbooks:data})}
discover = (query) =>{BooksAPI.search(query).then(data => this.setDiscovered(data))}

  render() {
    console.log(this.state)

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
                <input type="text" placeholder="Search by title or author"  onChange={event => {this.discover(event.target.value)}}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              <BookList shelf="Currently Reading" books={this.state.currentlyReading} parentMethod={this.someMethod}/>
              <BookList shelf="Want to Read" books={this.state.wantToRead} parentMethod={this.someMethod}/>
              <BookList shelf="Read" books={this.state.finishedReading} parentMethod={this.someMethod}/>
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
