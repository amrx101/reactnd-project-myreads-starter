import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchbooks: [],
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
    console.log("HAIYA")
    BooksAPI.update(Book, shelf)
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

        <Route path="/search" component={Search}/>

      </div>
    )
  }
}


  

export default BooksApp
