import React from 'react';
import {Route} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import Hobbies from './components/Hobbies/Hobbies'
import Login from "./components/Login/Login";
import UserCabinet from "./components/UserCabinet/UserCabinet";

function App(props) {
  return (<div>
        <div className="app-wrapper">
          <Header />
          <div className="app-wrapper-content">
              <Route exact path="/" render={ () => <MainPage />}/>
              <Route exact path="/hobbies" render={ () => <Hobbies />} />
              <Route exact path="/login" render={ () => <Login />} />
              <Route exact path="/user_cabinet" render={ () => <UserCabinet />} />
          </div>
        </div>
      </div>
  );
}



export default App;
