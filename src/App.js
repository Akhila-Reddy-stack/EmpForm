import React from "react";
import "./App.scss";
import './styles/emp.scss'
import './styles/table.scss'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import EmpForm from "./Pages/EmpForm";
import EmployeeList from "./Pages/EmpList";

function App(props) {
  return (
    <Router>
      <div className="App">
        <div className="wrapper" style={{ width: "100%" }}>
          <Switch>
            <Route path="/registration" component={EmpForm} />
            <Route path="/empList" component={EmployeeList} />
            <Redirect to="/registration" component={EmpForm}></Redirect>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

