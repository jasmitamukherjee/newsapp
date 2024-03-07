
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './components/About';

const App = ()=> {
  const pageSize=9
  const apiKey=''
  // apiKey=process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)
  
 
 

  
    return (
      <Router>
      <div>
      <Navbar/>
      <LoadingBar
        height={4}
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
        
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/' element = {<News setProgress={setProgress} apiKey={apiKey} key="general"  pageSize={pageSize} country="us" category="general"/>}/>
        <Route exact path='/business' element = {<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business"/>}/>
        <Route exact path='/entertainment' element = {<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment"/>}/>
        <Route exact path='/general' element = {<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general"/>}/>
        <Route exact path='/health' element = {<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health"/>}/>
        <Route exact path='/science' element = {<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science"/>}/>
        <Route exact path='/sports' element = {<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports"/>}/>
        <Route exact path='/technology' element = {<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology"/>}/>
       
       
       
       
       
       
       
        </Routes>
      </div>
      </Router>
    )
  
}
export default App;
