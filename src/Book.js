import React from 'react'
import * as BooksAPI from './BooksAPI'

class Authors extends React.Component{
  render (){
    return (<div className="book-authors">{this.props.authors}</div>);
  }
}

class Title extends React.Component{
  render(){
    return (<div className="book-title">{this.props.title}</div>)
  }
}

class BookCover extends React.Component{
  render (){
    console.log(this.props)
    return(<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.thumbnail})`}}></div>)

  }
}

class BookShelfChanger extends React.Component{

  chaneShelf = (e) => {BooksAPI.update(this.props.bookId, e.target.value)}
  render(){
    return (<div className="book-shelf-changer">
                              <select  onChange={this.chaneShelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          )
  }
}

class Book extends React.Component{
  // component that represents a Book on a shelf

  click = () => {this.props.parentMethod()}
  render(){
    const book = this.props.book
    return (
      <div className="book">
        <div className="book-top">
            <BookCover imageLinks={book.imageLinks}/>
            <BookShelfChanger shelf={book.shelf} bookId={book.id}/>
        </div>
        <Title title={book.title}/>
        <Authors authors={book.author}/>
      </div>)
  }
}

export default Book