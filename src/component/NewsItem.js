import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, desc, imgUrl, newsUrl, author, date , source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                <span style={{zIndex:1 , left: '88%'}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {source}</span>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{desc}</p>
                        <a href={newsUrl} rel='noreferrer' target="_blank" className="btn btn-dark">Read More</a>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} On {new Date(date).toDateString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}
