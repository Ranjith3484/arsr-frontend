import Router from './components/router';
import './App.css';
import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import {  useSelector } from 'react-redux';

function App() {
  const loading =  useSelector((state)=>state.loading)
  return (
      <div className='page-wrapper'>
        <Router />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
  );
}

export default App;
