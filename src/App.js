import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

let list = [
  {
    id: "123123",
    name: "Pradeep",
    age: "18",
    course: "cse",
  },
  {
    id: "d81293",
    name: "Praacs",
    age: "19",
    course: "cse",
  },
  {
    id: "ad12w1",
    name: "bruhment",
    age: "21",
    course: "eee",
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTrigger: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.id !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearch(event) {
    this.setState({ searchTrigger: event.target.value });
  }

  render() {
    const { list, searchTrigger } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            searchTrigger={searchTrigger}
            onSearch={this.onSearch}
          >
            Search
          </Search>
        </div>

        <Table
          list={list}
          searchTrigger={searchTrigger}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const isSearched = searchTerm =>
  item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase());

const Search = ({ searchTrigger, onSearch, children }) =>
  <div className="Search">
    <form>
      <div class="container input-field">
        <h4>{children}</h4>
        <input type="text" value={searchTrigger} onChange={onSearch}></input>
      </div>
    </form>
  </div>


const Table = ({ list, searchTrigger, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(searchTrigger)).map((item) => (
      <div key={item.id} className="table-row">
        <span className="row-title">{item.name} --  </span>
        <span>{item.age}  </span>
        <span>{item.course}</span>
        <span>
          <button
            className="button-inline"
            onClick={() => onDismiss(item.id)}
            type="button"
          >
            Dismiss
          </button>
        </span>
      </div>
    ))}
  </div>

export default App;
