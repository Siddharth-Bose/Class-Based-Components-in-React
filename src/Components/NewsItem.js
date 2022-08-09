import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, url, newsUrl } = this.props;
    return (
        <div className="container">
          <div className="card">
            <img
              src={
                url? url: "https://images.news18.com/ibnlive/uploads/2022/08/collage-maker-08-aug-2022-07.27-am-165992414816x9.jpg"
              }
              alt="Alt"
            />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a
                href={newsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-dark"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
    );
  }
}

export default NewsItem;
