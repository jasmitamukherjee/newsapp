import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category : "general"

    }
    static propTypes={
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category : PropTypes.string
    }
   capitalize = (string)=>{

        return string.charAt(0).toUpperCase()+string.slice(1);

    }

    constructor(props) {

        super(props);
        console.log('hello i am constructor from News ')
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults: 0

        }
        document.title= `${this.capitalize(this.props.category)} - NewsDaily`;

    }
    async updateNews(){

        this.props.setProgress(10);

        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb60433b74224f699120e10025c483fc&page=${this.state.page}pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data= await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState(
            {
                articles:parsedData.articles,
            totalResults: parsedData.totalResults,
            loading : false,
            
        })
        this.props.setProgress(100);
    }

    async componentDidMount(){

        this.updateNews()


    }

     handlePreviousClick=async ()=>{
       

        this.setState({page :this.state.page - 1 })
        this.updateNews()


    }
     handleNextClick=async ()=>{
   

    this.setState({page :this.state.page + 1 });
    this.updateNews()

    }

    fetchMoreData=async ()=>{
        this.setState({page:this.state.page + 1})
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb60433b74224f699120e10025c483fc&page=${this.state.page}pageSize=${this.props.pageSize}`
        // this.setState({loading:true});
        let data= await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState(
            {
                articles:this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading : false,
            
        })
    }


    render() {
        return (
            <>
                <h1 className='text-center'>NewsDaily- Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}

                <InfiniteScroll
          dataLength={this.state.articles.length !== this.state.totalResults}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length}
          loader={<Spinner/>}
        >

            <div className="container">
         


                <div className="row">
                    { this.state.articles.map((element) => {
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
}

export default News
