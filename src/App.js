import React, { Component } from "react";
import "./App.css";

const DEFAULT_QUERY = 'react';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const large_column = { width: '55%' };
const medium_column = { width: '20%' };
const small_column = { width: '5%' };

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
      pageSearch: '',
      searchKey: ''
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onPageSearch = this.onPageSearch.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }


  needsToSearchTopStories(searchKey) {
    return !this.state.result[searchKey]
  }

  fetchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm))
      this.fetchTopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories(results) {
    const { hits, page } = results;
    const { searchKey, result } = this.state;

    const oldHits = result && result[searchKey] ?
      result[searchKey].hits :
      [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      result: {
        ...result,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      }
    });
  }

  onDismiss(id) {
    const { searchKey, result } = this.state;
    const { hits, page } = result[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedList = hits.filter(isNotId);
    this.setState({
      result: {
        ...result,
        [searchKey]: {
          hits: updatedList,
          page
        }
      }
    });
  }

  onSearch(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onPageSearch(event) {
    this.setState({ pageSearch: event.target.value })
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchTopStories(searchTerm);
  }

  render() {
    const { pageSearch, result, searchKey } = this.state;

    const page = (
      result &&
      result[searchKey] &&
      result[searchKey].page
    ) || 0;

    const list = (
      result &&
      result[searchKey] &&
      result[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <h1 className="fadein">Hacker News Clone</h1>
          <h1>{(result && result.page)}</h1>
          <Search
            onSearch={this.onSearch}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <div className="table-head">
          <span style={{ width: '53%' }}>Article</span>
          <span style={{ width: '13%' }}>Author</span>
          <span style={{ width: '15%' }}>Comments</span>
          <span style={{ width: '15%' }}>Points</span>
        </div>
        <div className="in-page">
          <input
            type="text" style={{ width: '200px' }}
            placeholder="Search in page"
            onChange={this.onPageSearch}
          >
          </input>
        </div>
        {
          result ?
            <Table
              list={list}
              searchTerm={pageSearch}
              onDismiss={this.onDismiss}
            /> :
            <h1>Loading...</h1>
        }
        {
          result &&
          <div className="interactions">
            <button onClick={() => this.fetchTopStories(searchKey, page + 1)}>
              More
          </button>
          </div>

        }

      </div >
    );
  }
}

const isSearched = searchTerm =>
  item => {
    if (item.title)
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());

  }

const Search = ({ onSearch, onSubmit, children }) =>
  <div className="Search">
    <form onSubmit={onSubmit}>
      <div class="container input-field">
        <input type="text" onChange={onSearch} placeholder="   Search a title">
        </input>
        <button type="submit" className="button-search">
          {children}
        </button>
      </div>
    </form>
  </div>


const Table = ({ list, searchTerm, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(searchTerm)).map((item) => (
      <div key={item.objectID} className="table-row">
        <span className="row-title" style={large_column}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={medium_column}>{item.author}  </span>
        <span style={small_column}>{item.num_comments}</span>
        <span style={small_column}>{item.points}</span>
        <span style={small_column}>
          <button
            className="button-inline"
            onClick={() => onDismiss(item.objectID)}
            type="button"
          >
            Dismiss
          </button>
        </span>
      </div>
    ))}
  </div>

export default App;
