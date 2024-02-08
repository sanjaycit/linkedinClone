
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {getUserAuth} from './actions/index'
import { connect } from 'react-redux';
function App(props) {
  useEffect(()=>{
    props.getUserAuth();
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<div><Header/><Home/></div>}></Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}


 const mapStateToProps=(state)=>{
  return {}
 };
 const mapDispatchToProps=(dispatch)=>({
  getUserAuth:()=>dispatch(getUserAuth()),
 });
export default connect(mapStateToProps,mapDispatchToProps)(App)
