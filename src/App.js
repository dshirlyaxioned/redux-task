import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
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

  static propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    addBooks: PropTypes.func.isRequired,
    editBooks: PropTypes.func.isRequired,
    deleteBooks: PropTypes.func.isRequired
  };

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
      alert('Successfully data added..!!');
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

  nameChange = (e) => {  
    this.setState({  
      title: e.target.value  
    });  
  } 
  
  dateChange = (e) => {  
    this.setState({  
      publishDate: e.target.value  
    });  
  } 

  categoryChange = (e) => {  
    this.setState({  
      category: e.target.value  
    });  
  } 

  authorChange = (e) => {  
    this.setState({  
      author: e.target.value  
    });  
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
        <h2>Book details</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" onChange={this.nameChange} value={this.state.title} placeholder="Enter title" id="title"/>
        </div>
        <div>
          <label htmlFor="date">Publish Date</label>
          <input type="date" onChange={this.dateChange} value={this.state.publishDate} id="date"/>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input type="text" onChange={this.categoryChange} value={this.state.category} placeholder="Enter book category" id="category"/>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" onChange={this.authorChange} value={this.state.author}  placeholder="Enter author name" id="author"/>
        </div>
        {this.state.id ? <button onClick={this.dataSubmit}>Save id={this.state.id}</button> : <button onClick={this.dataSubmit}>Add</button>} 
        <button onClick={this.clearData}>Clear</button>
      </div>
      <div className="data-display">
        <h3>Records</h3>
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
            {this.props.books && this.props.books.map((data1, index) => {
              return <tr key={index + 1}>
                <td>{(index + 1)}</td>
                <td>{data1.title}</td>
                <td>{data1.category}</td>
                <td>{data1.publishDate}</td>
                <td>{data1.author}</td>
                <td><button onClick={() => this.editData(data1)}>Edit</button></td>
                <td><button onClick={() => this.deleteBooks(data1.id)}>Delete</button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => (
  {
    books: state.books
  }
) 



export default connect(mapStateToProps, { getBooks, addBooks, editBooks, deleteBooks }) (App);
