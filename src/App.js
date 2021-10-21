import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import {getBooks, addBooks, editBooks, deleteBooks} from './Components/Action';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      category: "",
      publishDate: "",
      author: ""
    };
  }

  componentDidMount() {
    this.props.getBooks();
  }

  dataSubmit = () => {
    if(this.state.title && this.state.category && this.state.publishDate && this.state.author && !this.state.id) {
      const newBook = {
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
        title: this.state.title,
        category: this.state.category,
        publishDate: this.state.publishDate,
        author: this.state.author
      };

      this.props.addBooks(newBook);
    } else if (this.state.title && this.state.category && this.state.publishDate && this.state.author && this.state.id) {
      const updateData = {
        id: this.state.id,
        title: this.state.title,
        category: this.state.category,
        publishDate: this.state.publishDate,
        author: this.state.author
      };
      this.props.editBooks(updateData); 
    } else {
      alert('Enter proper Book details..');
    }
    this.clearData();
  }

  editData = (data) => {
    this.setState(
      {
        id: data.id,
        title: data.title,
        category: data.category,
        publishDate: data.publishDate,
        author: data.author
      }
    )
  }

  deleteBooks = (id) => {
    this.clearData();
    if(window.confirm("Are you sure?")) {
      this.props.deleteBooks(id);
    }
  }

  clearData = () => {
    this.setState(
      {
        id: 0,
        title: "",
        category: "",
        publishDate: "",
        author: ""
      }
    );
  }

  render() {
    return (
      <>
      <div className="input-section">
        <div>
          <label for="title">Title</label>
          <input type="text" value={this.state.title} placeholder="Enter title" id="title"/>
        </div>
        <div>
          <label for="date">Publish Date</label>
          <input type="date" value={this.state.publishDate} id="date"/>
        </div>
        <div>
          <label for="category">Category</label>
          <select name="category" id="category">
            <option value={this.state.category}>Sci-Fi</option>
            <option value={this.state.category}>Kids</option>
            <option value={this.state.category}>Horror</option>
            <option value={this.state.category}>Thriller</option>
          </select>
        </div>
        <div>
          <label for="author">Author</label>
          <select name="author" id="author">
            <option value={this.state.author}>Aesoph</option>
            <option value={this.state.author}>Lucy Dias</option>
            <option value={this.state.author}>James Holland</option>
            <option value={this.state.author}>Tom Cruis</option>
          </select>
        </div>
        {this.state.id ? <button onClick={this.dataSubmit}>Save{this.state.id}</button> : <button onClick={this.dataSubmit}>Add</button>} 
        <button onClick={this.clearData} className="clear">Clear</button>
      </div>
      <div className="data-display">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Publish date</th>
              <th>Author</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.books && this.props.books.map((data, index) => {
              return <tr key={index + 1}>
                <td>{(index + 1)}</td>
                <td>{data.title}</td>
                <td>{data.category}</td>
                <td>{data.publishDate}</td>
                <td>{data.author}</td>
                <td>
                  <button onClick={() => this.editData(data)}>Edit</button>
                  <button onClick={() => this.deleteBooks(data.id)}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      </>
    );
  }
}

const stateChange = state => (
  {
    books: state.books
  }
) 



export default connect(stateChange, { getBooks, addBooks, editBooks, deleteBooks }) (App);
