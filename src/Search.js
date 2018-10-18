import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import { Link } from 'react-router-dom'


class Search extends React.Component{
	constructor() {
		super()
      	this.state = { books: [] };
  	}

	assign(data){
	    if (data === undefined || data.error !== undefined){
	      return []
	    }
	    let shelfBooks = this.props.shelfBooks
	    let ids = shelfBooks.map(book => book.id)
	    let discoveredBooks = data.filter(a => !ids.includes(a.id))
	    discoveredBooks.forEach((obj => { obj.shelf = "none"; }))

	    return discoveredBooks.concat(shelfBooks)
	}

	setDiscovered =(data) => {this.setState({books:this.assign(data)})}
	discover = (query) =>{BooksAPI.search(query).then(data => this.setDiscovered(data))}
	discover_new = (query) => (query !== undefined) ? this.discover(query):this.setDiscovered([])

  	render(){
  		return(
  			<div className="search-books">
            <div className="search-books-bar">
              <Link
                className="close-search"
                to="/">
                Close
              </Link>

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
            <BookList shelf="Search Result" books={this.state.books} update={this.props.update}/>
            </div>
          </div>
  			
  		)

  	}
}

export default Search