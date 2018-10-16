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

  // render() {
  //   return (
  //     <div>
  //       <Route exact path='/' render={() => (
  //         <ListContacts
  //           contacts={this.state.contacts}
  //           onDeleteContact={this.removeContact}
  //         />
  //       )} />
  //       <Route path='/create' component={CreateContact} />
  //     </div>
  //   )
  // }

  render(){
    return(
      <div>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              <BookList shelf="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")}/>
              <BookList shelf="Want to Read" books={this.state.books.filter(book => book.shelf==="wantToRead")}/>
              <BookList shelf="Read" books={this.state.books.filter(book => book.shelf === "read")}/>
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
