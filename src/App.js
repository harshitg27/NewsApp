import React, { Component } from 'react'
import './App.css';
import NavBar from './component/NavBar';
import News from './component/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar title="News App" />
        <Routes>
          <Route exact path="/" element={<News key='general' pageSize={12} country='in' category='general' />}>
          </Route>
          <Route exact path="/general" element={<News key='general2' pageSize={12} country='in' category='general' />} ></Route>
          <Route exact path="/business" element={<News key='business' pageSize={12} country='in' category='business' />} ></Route>
          <Route exact path="/entertainment" element={<News key='entertainment' pageSize={12} country='in' category='entertainment' />} ></Route>
          <Route exact path="/health" element={<News key='health' pageSize={12} country='in' category='health' />} ></Route>
          <Route exact path="/science" element={<News key='science' pageSize={12} country='in' category='science' />} ></Route>
          <Route exact path="/sport" element={<News key='sport' pageSize={12} country='in' category='sport' />} ></Route>
          <Route exact path="/technology" element={<News key='technology' pageSize={12} country='in' category='technology' />} ></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}