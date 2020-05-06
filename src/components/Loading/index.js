import React from "react";
import './index.css';

const Loading = () =>
    <div>
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
        <div className="interactions">
            <h5>Loading...</h5>
        </div>
    </div>

export default Loading;