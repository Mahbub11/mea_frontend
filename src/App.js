import logo from './logo.svg';
import './App.css';
import Router from './routes/Route';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo } from './redux/slices/auth';

function App() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  
    
  }, []);
  return (
   <>
   <Router></Router>
   </>
  );
}

export default App;
