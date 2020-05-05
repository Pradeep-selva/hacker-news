import React from "react"

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
            <h3>Loading...</h3>
        </div>
    </div>

export default Loading;