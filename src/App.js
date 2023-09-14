import React, { Component } from 'react'
import './App.css';
import NavBar from './component/NavBar';
import News from './component/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  // apiKey = process.env.REACT_APP_NEWS_API 
  apiKey = '71ed88940e94433794d69b3d8f687ecc' ;
  
  state = {
    progress : 10
  }
  setProgress = (progress) => {
    // console.log('progress');
    this.setState({progress : progress})
  }
  render() {
    // console.log(process.env.REACT_APP_NEWS_API );
    return (
      <BrowserRouter>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <NavBar title="News App" />
        <Routes>
          <Route exact path="/" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='general' pageSize={12} country='in' category='general' />}>
          </Route>
          <Route exact path="/general" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='general2' pageSize={12} country='in' category='general' />} ></Route>
          <Route exact path="/business" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='business' pageSize={12} country='in' category='business' />} ></Route>
          <Route exact path="/entertainment" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='entertainment' pageSize={12} country='in' category='entertainment' />} ></Route>
          <Route exact path="/health" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='health' pageSize={12} country='in' category='health' />} ></Route>
          <Route exact path="/science" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='science' pageSize={12} country='in' category='science' />} ></Route>
          <Route exact path="/sport" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='sport' pageSize={12} country='in' category='sport' />} ></Route>
          <Route exact path="/technology" element={<News progress = {this.setProgress} apiKey = {this.apiKey} key='technology' pageSize={12} country='in' category='technology' />} ></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}