import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // document.title= `${capitalize(props.category)} - NewsDaily`;

    
   const capitalize = (string)=>{

        return string.charAt(0).toUpperCase()+string.slice(1);

    }

    
    const updateNews = async ()=> {

        props.setProgress(10);

        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}pageSize=${props.pageSize}`
       
        setLoading(true)
        let data= await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

       
        props.setProgress(100);
    }

    useEffect(() => {
      updateNews();
    
      
    }, [])
    

   

     const handlePreviousClick=async ()=>{
       

       
        setPage(page-1)
        updateNews()


    }
    const  handleNextClick=async ()=>{
   

        setPage(page+1)
    updateNews()

    }

    const fetchMoreData=async ()=>{
        
        setPage(page+1)
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eb60433b74224f699120e10025c483fc&page=${this.state.page}pageSize=${props.pageSize}`
        // this.setState({loading:true});
        let data= await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))

        setTotalResults(parsedData.totalResults)
        setLoading(false)
            
    }


   
        return (
            <>
                <h1 className='text-center'>NewsDaily- Top {capitalize(props.category)} Headlines</h1>
                {loading && <Spinner/>}

                <InfiniteScroll
          dataLength={articles.length !== totalResults}
          next={fetchMoreData}
          hasMore={articles.length}
          loader={<Spinner/>}
        >

            <div className="container">
         


                <div className="row">
                    { articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} url={element.url} author={element.date} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}




                </div>
                </div>
       
</InfiniteScroll>
          

            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category : "general",
    

}
News.propTypes={
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string
}
export default News
