import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFaculty from "./components/faculty/add-faculty.component";
import Faculty from "./components/faculty/faculty.component";
import FacultiesList from "./components/faculty/faculties-list.component";
import InstitutesList from "./components/institute/institutes-list.component";
import Institute from "./components/institute/institute.component";
import AddInstitute from "./components/institute/add-institute.component";
import Error from "./components/error";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/faculties"} className="nav-link">
                Wydziały
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/faculties"]} component={FacultiesList} />
            <Route exact path= {"/faculties/:id/institutes"} component={InstitutesList} />
            <Route exact path={"/add"} component={AddFaculty} />
            <Route exact path={"/faculties/:id/institute/add"} component={AddInstitute} />
            <Route exact path={"/faculties/:id"} component={Faculty} />
            <Route exact path={"/faculties/:id/institute/:instituteId"} component={Institute} />
            <Route component={Error}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
