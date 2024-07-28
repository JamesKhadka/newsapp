import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState([true])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  //  document.title = `${capitalizeFirstLetter(props.category)} - CurrentWave`;

  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(10);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json()
    props.setProgress(60);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResult)
    setLoading(false)


    props.setProgress(100)

  }

  //componentDidMount is use to fetch data from web api
  useEffect(() => {
    updateNews();

  },)

  // const handlePrevClick = async () => {
  //   setPage(page - 1)
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // }


  // scrool bar fatching data
  const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json()
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResult)
  };


  return (
    <>

      <h1 className="text-center"><b>CurrentWaves -Todays Breaking News  From  {capitalizeFirstLetter(props.category)}: </b></h1>
      {loading && <Spinner />}
      {/* infinite scrool bar  */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>

        <div className="container">
          <div className="row" >
            {articles.map((element) => {
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

News.defaultProps = {
  country: 'us',
  pageSize: 12,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News
