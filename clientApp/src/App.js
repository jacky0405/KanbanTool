import './App.css';
import {Provider} from 'react-redux';
import store from "./store";
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import addProject from './components/Project/addProject';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import setJWTToken from './securityUtil/setJWTToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';

const token = localStorage.getItem("token");
if (token) {
  setJWTToken(token);
  const decode = jwtDecode(token);
  store.dispatch({
    "type": SET_CURRENT_USER,
    "payload": decode
  })

  const currentTime = Date.now()/1000;
  if(decode.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
        <Header/>
          <Switch>   
            <Route exact path="/" component={Landing}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/addProject" component={addProject}/>
            <Route path="/updateProject/:id" component={UpdateProject}/>
            <Route path="/projectBoard/:id" component={ProjectBoard}/>
            <Route path="/addProjectTask/:id" component={AddProjectTask}/>
            <Route path="/updateProjectTask/:id/:sequence" component={UpdateProjectTask}/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
