import React, { useState,Component } from "react";
import FacultyDataService from "../../services/faculty.service";
import { Link } from "react-router-dom";
import "./faculties-list.css"



export default class FacultiesList extends Component {
  constructor(props) {
    super(props);
    this.getFaculties = this.getFaculties.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFaculty = this.setActiveFaculty.bind(this);
    this.removeFaculty = this.removeFaculty.bind(this);
  
  
    this.state = {
      faculties: [],
      currentFaculty: null,
      currentIndex: -1,
    };
  }


  componentDidMount() {
    this.getFaculties();
  }

  refreshList() {
    this.getFaculties();
    this.setState({
      currentFaculty: null,
      currentIndex: -1,
    });
  }
  setActiveFaculty(faculty, index) {
    this.setState({
      currentFaculty: faculty,
      currentIndex: index,
    });
  }

  getFaculties() {
    FacultyDataService.getAll()
      .then(response => {
        this.setState({
          faculties: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }


  removeFaculty() {
    if(this.state.currentFaculty != null) {
    FacultyDataService.delete(this.state.currentFaculty.id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
        alert("Usunięto wydział.");
      })
      .catch(e => {
        console.log(e);
      });
    }
    else {

    }
  }

  render() {
    const {  faculties, currentFaculty, currentIndex } = this.state;
    return (
      <div className="container">
      <div className="list row">
        <div className="col-md-6">
          <div id="table">Lista Wydziałów</div>

          <ul className="list-group">
            {faculties &&
              faculties.map((faculty, index) => (
                <li
                  className={
                    "list-group-item list-group-item-warning" +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFaculty(faculty, index)}
                  key={index}
                >
                  {faculty.name}
                </li>
              ))}
          </ul>
          <Link
                to={"/add" }
                className="m-3 btn btn-success"
              >
                Dodaj Wydział
              </Link>
        </div>
 </div> <div className="list row">
        <div className="col-md-6">
          {currentFaculty ? (
            <div>
              <div id="title">Wydział</div>
              <div id="label">
                <label>
                  <strong>Nazwa:</strong>
                <div id="data">
                {currentFaculty.name}
                </div>
                </label>
                </div>
              <div id="label">
                <label>
                  <strong>Opis:</strong>
                </label>{" "}
                </div>
                <div id="data">
                {currentFaculty.description}
                </div>
          
              <div id="label">
                <label>
                  <strong>Adres: </strong>
                <div id="data">
                {currentFaculty.address}
                </div>
                </label>
                </div>

              <Link
                to={"/faculties/" + currentFaculty.id}
                className="btn btn-warning" type="button"
              >
                Edytuj
              </Link>
              <Link
              to={"/faculties/" + currentFaculty.id + "/institutes"}
              className="btn btn-primary" type="button">
                Przeglądaj instytuty
              </Link>
              <button
            className="btn btn-danger" type="button"
            onClick={this.removeFaculty}
          >
            Usuń
          </button>
            </div>
          ) 
         
          : (
            <div>
              <br />
              <div id="text">Wybierz dowolny Wydział.</div>
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }
  }