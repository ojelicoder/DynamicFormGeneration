import React from 'react';
import ReactDOM from 'react-dom';
import route from './core/routes';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {route.map((page, index) => <Route path={page.path} element={<page.component/> } key={index}/>)}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();