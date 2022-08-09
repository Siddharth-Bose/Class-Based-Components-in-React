import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps={
        pageSize:6,
        country:'in'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number
    }
    handlePreviousClick= async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e297749661064092a8d94019bd0902c5&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data=await fetch(url);
        let parsedData= await data.json();
        this.setState({articles: parsedData.articles,page: this.state.page -1,loading:false});
    }
    handleNextClick= async ()=>{
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
            
        }
        else{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e297749661064092a8d94019bd0902c5&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data=await fetch(url);
        let parsedData= await data.json();
        this.setState({articles: parsedData.articles,page: this.state.page +1,loading:false});
    }
    
}
constructor() {
    super();
    this.state = {
        articles: [],
        loading: false,
        page:1,
    };
}
async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=e297749661064092a8d94019bd0902c5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data=await fetch(url);
    let parsedData= await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false})
  }
  render() {
    return (
        <>
        
      <div className="container my-3">
        <h1 className="my-3 text-center">NewsMonkey Top- Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="container mt-5 d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark btn-md" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark btn-md" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0,45):""}
                  description={element.description?element.description.slice(0,88):""}
                  url={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container mt-5 d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark btn-md" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  className="btn btn-dark btn-md" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </div>
      </>
    );
  }
}

export default News;
