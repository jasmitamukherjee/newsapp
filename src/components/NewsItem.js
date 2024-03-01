import React, { Component } from 'react'

export class NewsItem extends Component {
    


    render() {

      let {title , description, imgUrl,url,author,date,source} = this.props;
        return (
            <div className='my-3'>
                <div className="card h-100">
                    <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
                    <span className=" badge square-pill bg-danger" >
    {source}
    
  </span>
                    </div>
              

                    <img src={imgUrl?imgUrl:"https://g.foolcdn.com/editorial/images/766881/a-human-like-head-with-lines-of-ai-computer-code-reflected-off-the-surface-and-projected-on-the-nearby-wall.jpg"}className="card-img-top" alt="..." />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={url} target='_blank' className="btn btn-dark btn-sm mt-auto">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
