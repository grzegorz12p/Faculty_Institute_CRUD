import React, { Component } from "react";
import InstituteDataService from "../../services/institute.service";
import { Link } from "react-router-dom";
import "./add-institute.css"
import FacultyDataService from "../../services/faculty.service";
export default class AddInstitute extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeDirector = this.onChangeDirector.bind(this);
      this.saveInstitute= this.saveInstitute.bind(this);
      this.newInstitute = this.newInstitute.bind(this);
  
      this.state = {
        id: null,
        name: "",
        description: "",
        director:"",

        submitted: false
      };
 
    }
    componentDidMount() {
      this.getFaculty(this.props.match.params.id);
    }

  getFaculty(id) {
      FacultyDataService.get(id)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
          alert("Niepoprawny adres!");
          window.location.href = "/faculties";
        });
      }
    
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
  
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }
    onChangeDirector(e) {
        this.setState({
          director: e.target.value
        });
      }
  
    saveInstitute() {
      var data = {
        name: this.state.name,
        description: this.state.description,
        director: this.state.director
      };
  
      InstituteDataService.create(this.props.match.params.id,data)
        .then(response =>  {
          this.setState({
            id: response.data.id,
            description: response.data.description,
            name: response.data.name,
            director: response.data.director,

            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
          alert("Aby przejść dalej wypełnij wszystkie pola.");
        });
    }
  
    newInstitute() {
      this.setState({
        id: null,
        name: "",
        description: "",
        director:"",
        submitted: false
      });
    }
  
    render() {
        return (
            <div>
              {this.state.submitted ? (
                <div>
                  <h4>Zatwierdzono!</h4>
                  <Link
                to={"/faculties/" + this.props.match.params.id + "/institutes" }
                className="m-3 btn btn-success"  onClick={this.newInstitute}
              >
                Wróć do instytutów
              </Link>
                </div>
              ) : (
                <div>
                    <div id="title">Instytut</div>
                  <div className="form-group">
                  <div id ="label" >   <label htmlFor="title">Nazwa</label></div>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required={true}
                      value={this.state.name}
                      onChange={this.onChangeName}
                      name="name"
                    />
                  </div>
      
                  <div className="form-group">
                  <div id ="label" >  <label htmlFor="description">Opis</label></div>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      required={true}
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                    />
                  </div>

                  <div className="form-group">
                  <div id ="label" >  <label htmlFor="description">Dyrektor</label></div>
                    <input
                      type="text"
                      className="form-control"
                      id="director"
                      required
                      value={this.state.director}
                      onChange={this.onChangeDirector}
                      name="director"
                    />
                  </div>
                  <button onClick={this.saveInstitute} type="submit" className="btn btn-success">
                    Zatwierdź
                  </button>
                  </div>
              )}
            </div>
          );
        }
    }
