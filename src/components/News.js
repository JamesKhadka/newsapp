import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {


  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
  capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }


  constructor(props) {
    super(props);
    console.log("this is news app made by james");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0


    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - CurrentWave`;

  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    this.props.setProgress(10);
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json()
    this.props.setProgress(60);
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResult


    })
    this.props.setProgress(100)

  }

  //componentDidMount is use to fetch data from web api
  async componentDidMount() {


    this.updateNews();


  }

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();

  // }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();



  // scrool bar fatching data
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResult
    })

  };

  render() {
    return (
      <>

        <h1 className="text-center"><b>CurrentWaves -Todays Breaking News  From  {this.capitalizeFirstLetter(this.props.category)}: </b></h1>
        {this.state.loading && <Spinner />}
        {/* infinite scrool bar  */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles !== this.state.totalResults}
          loader={<Spinner />}>

          <div className="container">
            <div className="row" >
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}
            </div>
          </div>

        </InfiniteScroll>


      </>


    )
  }
}

export default News
