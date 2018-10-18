import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {books: []};
    this.update = this.update.bind(this)
    this.getAllBooks = this.getAllBooks.bind(this)
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

  update(Book, shelf){
    BooksAPI.update(Book, shelf).then(this.getAllBooks)
  }


  render(){
    return(
      <div>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              <BookList shelf="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")} update={this.update}/>
              <BookList shelf="Want to Read" books={this.state.books.filter(book => book.shelf==="wantToRead")} update={this.update}/>
              <BookList shelf="Read" books={this.state.books.filter(book => book.shelf === "read")} update={this.update}/>
            </div>

            <div className="open-search">
              <Link
                to='/search'
                className="open-search"
                >Add a Book </Link>
            </div>
          </div>
        )} />

        <Route
          path="/search"
          render={(props) => <Search {...props} shelfBooks={this.state.books} update={this.update} />}
        />
       

      </div>
    )
  }
}


  

export default BooksApp
