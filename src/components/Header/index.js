import React from 'react';
import './index.css'
import {
    large_column,
    medium_column,
    small_column
} from '../../Constants/constants'

const Header = ({ sortCriteria }) =>
    <div className="table-head">
        <span style={large_column}
            className={sortCriteria == 'Title' && 'sortCriteria'}
        >
            Title
          </span>
        <span
            style={medium_column}
            className={sortCriteria == 'Author' && 'sortCriteria'}
        >
            Author
          </span>
        <span
            style={medium_column}
            className={sortCriteria == 'Comments' && 'sortCriteria'}
        >
            Comments
          </span>
        <span
            style={medium_column}
            className={sortCriteria == 'Points' && 'sortCriteria'}
        >
            Points
          </span>
        <span style={small_column}>
            Archive
          </span>
    </div>

export default Header;