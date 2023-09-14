import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

export default class News extends Component {
    static propTypes = {
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: "general"

    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResult: 0
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResult: parseData.totalResults,
            loading: false
        });
        this.props.progress(100) ;
        document.title = this.capitalizeFirstLetter(this.props.category);

    }
    // updateNews = async () => {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71ed88940e94433794d69b3d8f687ecc&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     // console.log(url);
    //     this.setState({
    //         articles: parseData.articles
    //     });
    // }
    // previousPage = async () => {
    //     // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71ed88940e94433794d69b3d8f687ecc&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    //     // let data = await fetch(url);
    //     // let parseData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parseData.articles
    //     // })
    //     this.setState({
    //         page: this.state.page - 1
    //     });
    //     this.updateNews() ;
    // }
    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResult: parseData.totalResults,
            loading: false
        });
    }
    // nextPage = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=71ed88940e94433794d69b3d8f687ecc&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    //     // let data = await fetch(url);
    //     // let parseData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page + 1,
    //     //     articles: parseData.articles
    //     // })
    //     await this.setState({
    //         page: this.state.page + 1
    //     }) ;
    //     await this.updateNews() ;
    // }
    render() {
        // const {country} = this.props ;
        return (
            <div className='container' style={{marginTop : 65}}>
                <h3 className='text-center my-2'>Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h3>
                {this.state.loading  && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    // inverse={true} //
                    hasMore={this.state.articles.length !== this.state.totalResult}
                    loader={this.state.loading && <Spinner />}
                // scrollableTarget="scrollableDiv"
                >
                    <div className='container'>
                        <div className='d-flex justify-content-around flex-wrap my-2'>
                            {this.state.articles.map((element) => {
                                return (
                                    <div className='my-1' key={element.url}>
                                        <NewsItem title={element.title} desc={element.description} imgUrl={element.urlToImage}
                                            newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.previousPage} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page === Math.ceil(this.state.totalResult / this.props.pageSize)} type="button" onClick={this.nextPage} className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}
