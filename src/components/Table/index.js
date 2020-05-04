import './index.css';
import {
    large_column,
    medium_column,
    small_column
} from '../../constants';
import React from "react";
import PropTypes from "prop-types";

const isSearched = searchTerm =>
    item => {
        if (item.title)
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());

    }

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

Table.propTypes = {
    list: PropTypes.array.isRequired,
    searchTerm: PropTypes.string,
    onDismiss: PropTypes.func.isRequired
};

export default Table;