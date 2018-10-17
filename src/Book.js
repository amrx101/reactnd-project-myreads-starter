import React from 'react'

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
    return(<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.thumbnail})`}}></div>)

  }
}

class BookShelfChanger extends React.Component{

  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="book-shelf-changer"> 
        <select value={this.props.shelf} onChange={(e) => this.props.update(this.props.book, e.target.value)}>
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
  render(){
    const book = this.props.book
    return (
      <div className="book">
        <div className="book-top">
        {book.imageLinks ?(
          <BookCover imageLinks={book.imageLinks}/>):(<BookCover imageLinks={""}/>)}
          <BookShelfChanger shelf={book.shelf} book={book} update={this.props.update}/>
        </div>
        <Title title={book.title}/>
        <Authors authors={book.author}/>
      </div>)
  }
}

export default Book