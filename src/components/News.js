import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    

    constructor() {

        super();
        console.log('hello i am constructor from News ')
        this.state = {
            articles: [],
            loading: false,
            page:1

        }
    }

    async componentDidMount(){

        let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb60433b74224f699120e10025c483fc&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState(
            {
                articles:parsedData.articles,
            totalResults: parsedData.totalResults,
            loading : false
        })


    }

     handlePreviousClick=async ()=>{
        console.log('previous');
        let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb60433b74224f699120e10025c483fc&page=${ this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        


        this.setState({
            page: this.state.page-1,
            articles:parsedData.articles,
            loading : false

        })


    }
     handleNextClick=async ()=>{
        console.log('next');
        if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb60433b74224f699120e10025c483fc&page=${ this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data= await fetch(url);
            let parsedData = await data.json();
            
            
    
    
            this.setState({
                page: this.state.page+1,
                articles:parsedData.articles,
                loading:false
    

        }
        )
    }

    }


    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsDaily Top Headlines</h1>
                {this.state.loading && <Spinner/>}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} url={element.url} />
                        </div>
                    })}




                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                <button 
                disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>

            </div>
        )
    }
}

export default News
