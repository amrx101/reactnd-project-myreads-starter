import React from 'react'
import Book from './Book'


class BookList extends React.Component{
    

	render(){
         const books = this.props.books

         //const error_display = <div className="bookshelf"><h2 className="bookshelf-title">{this.props.shelf}</h2><p className="error">No Book</p></div>

         if (books === undefined){
            return (<div className="bookshelf"><h2 className="bookshelf-title">{this.props.shelf}</h2><p className="error">Type Search Word</p></div>)
         }

         if (books.error !== undefined){
            return (<div className="bookshelf"><h2 className="bookshelf-title">{this.props.shelf}</h2><p className="error">{books.error}</p></div> )
         }
		return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props
                        .books
                        .map((book) => {
                            return <li key={book.id}>
                                <Book book={book} update={this.props.update}/>
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