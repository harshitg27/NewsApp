import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export default class News extends Component {
    static propTypes = {
        country : PropTypes.string.isRequired,
        pageSize : PropTypes.number,
        category : PropTypes.string 
    }
    static defaultProps = {
        country : 'in',
        pageSize : 12 ,
        category : "general"

    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1 ,
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71ed88940e94433794d69b3d8f687ecc&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({ articles: parseData.articles ,
            temp :parseData.totalResults });
        document.title = this.capitalizeFirstLetter(this.props.category) ;
        
    }
    updateNews = async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71ed88940e94433794d69b3d8f687ecc&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(url);
        this.setState({
            articles: parseData.articles
        });
    }
    previousPage = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71ed88940e94433794d69b3d8f687ecc&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles
        // })
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews() ;
    }
    nextPage = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71ed88940e94433794d69b3d8f687ecc&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parseData.articles
        // })
        await this.setState({
            page: this.state.page + 1
        }) ;
        await this.updateNews() ;
    }
    render() {
        // const {country} = this.props ;
        return (
            <div className='container'>
                <h3 className='text-center'>Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h3>

                <div className='d-flex justify-content-around flex-wrap'>
                    {this.state.articles.map((element) => {
                        return (
                            <div className='' key={element.url}>
                                <NewsItem title={element.title} desc={element.description} imgUrl={element.urlToImage} 
                                newsUrl={element.url} author={element.author} date = {element.publishedAt} source = {element.source.name} />
                            </div>
                        )
                    })}
                    

                </div>
                <div className="d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" onClick={this.previousPage} className="btn btn-dark">&larr; Previous</button>
                        <button disabled={ this.state.page === Math.ceil(this.state.temp/this.props.pageSize )} type="button" onClick={this.nextPage} className="btn btn-dark">Next &rarr;</button>
                    </div>
            </div>
        )
    }
}
