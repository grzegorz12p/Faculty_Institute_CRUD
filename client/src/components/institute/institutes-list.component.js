import React, { Component } from "react";
import InstituteDataService from "../../services/institute.service";
import { Link } from "react-router-dom";
import "./institute.css"


export default class InstitutesList extends Component {
  constructor(props) {
    super(props);
    this.getInstitutes = this.getInstitutes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveInstitute = this.setActiveInstitute.bind(this);
    this.removeInstitute = this.removeInstitute.bind(this);

    this.state = {
     institutes: [],
      currentInstitute: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.getInstitutes();
  }


  getInstitutes() {
    InstituteDataService.getAll(this.props.match.params.id)
      .then(response => {
        this.setState({
          institutes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        alert("Niepoprawny adres!");
        window.location.href = "/faculties";
      });

  }

  refreshList() {
    this.getInstitutes();
    this.setState({
      currentInstitute: null,
      currentIndex: -1,
    });
  }

  setActiveInstitute(institute, index) {
    this.setState({
      currentInstitute: institute,
      currentIndex: index,
    });
  }

  removeInstitute() {
    if(this.state.currentInstitute != null) {
    InstituteDataService.delete(this.props.match.params.id,this.state.currentInstitute.id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
        alert("Usunięto instytut.");
      })
      .catch(e => {
        console.log(e);
      });
    }
    else {

    }
  }

 render() {
    const {  institutes, currentInstitute, currentIndex } = this.state;

    return (
      <div className="container">
      <div className="list row">
        <div className="col-md-6">
          <div id="table">Lista Instytutów</div>

          <ul className="list-group">
            {institutes &&
              institutes.map((institute, index) => (
                <li
                  className={
                    "list-group-item list-group-item-warning" +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveInstitute(institute, index)}
                  key={index}
                >
                  {institute.name}
                </li>
              ))}
          </ul>

          <Link
                to={"/faculties/" + this.props.match.params.id + "/institute/add" }
                className="m-3 btn btn-success"
              >
                Dodaj Instytut
              </Link>
              <Link
                to={"/faculties/"}
                className="m-3 btn btn-warning"
              >
                Powrót do wydziałów
        </Link>
              </div>
        </div>
        <div className="list row">
        <div className="col-md-6">
          {currentInstitute ? (
            <div>
              <div id="title">Instytut</div>
              <div id="label">
                <label>
                  <strong>Nazwa:</strong>
                <div id="data">
                {currentInstitute.name}
              </div>
              </label>
              </div>
              <div id="label">
                <label>
                  <strong>Opis:</strong>
                <div id="data">
                {currentInstitute.description}
                </div>
              </label>
              </div>
              <div id="label">
                <label>
                  <strong>Dyrektor:</strong>
                
                <div id="data">
                {currentInstitute.director}
                </div>
              </label>
              </div>

              <Link
                to={"/faculties/" + this.props.match.params.id + "/institute/" + currentInstitute.id }
                className="btn btn-warning"
              >
                Edytuj
              </Link>
              <button
            className="btn btn-danger"
            onClick={this.removeInstitute}
          >
            Usuń
          </button>
            </div>
            
          ) : (
            <div>
              <br />
              <div id="text">Wybierz dowolny Instytut.</div>
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
  }