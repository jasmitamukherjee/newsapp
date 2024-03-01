import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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
            page:1

        }
        document.title= `${this.capitalize(this.props.category)} - NewsDaily`;

    }
    async updateNews(){

        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb60433b74224f699120e10025c483fc&page=${this.state.page}pageSize=${this.props.pageSize}`
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


    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsDaily- Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} url={element.url} author={element.date} date={element.publishedAt} source={element.source.name}/>
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
