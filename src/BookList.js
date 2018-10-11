import React from 'react'
import Book from './Book'


class BookList extends React.Component{
    

	render(){
		   return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props
                        .books
                        .map((book) => {
                            return <li key={book.id}>
                                <Book book={book} shift={this.props.parentMethod}/>
                            </li>
                        })
                      }
                </ol>
            </div>
        </div>
    )
}

}


export default BookList