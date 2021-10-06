import React, { Component } from "react";
import FacultyDataService from "../../services/faculty.service";
import { Link } from "react-router-dom";
import './add-faculty.css';
import FacultiesList from "./faculties-list.component";

export default class AddFaculty extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeAddress = this.onChangeAddress.bind(this);
      this.saveFaculty= this.saveFaculty.bind(this);
      this.newFaculty= this.newFaculty.bind(this);
  
      this.state = {
        id: null,
        name: "",
        description: "",
        address: "",

        submitted: false
      };
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
    onChangeAddress(e) {
        this.setState({
          address: e.target.value
        });
      }
  
    saveFaculty() {
      var data = {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address
      };
  
      FacultyDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            description: response.data.description,
            name: response.data.name,
            address: response.data.address,

            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
          alert("Aby przejść dalej wypełnij wszystkie pola.");
        });
    }
  
    newFaculty() {
      this.setState({
        id: null,
        name: "",
        description: "",
        address: "",
        submitted: false
      });
    }
  
    render() {
        return (<div>
              {this.state.submitted ? (
                <div>
                  <h4>Zatwierdzono!</h4>
                  <Link
                to="/faculties/" 
                className="m-3 btn btn-success"
                onClick={this.newFaculty} 
              >
                Wróć do listy wydziałów
              </Link>
                </div>
           
              ) : (
                <div>
        
                    <div id="title">Wydział</div>
                  <div className="form-group"  >
                  <div id ="label" > <label htmlFor="title">Nazwa</label></div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Podaj nazwę"
                      id="name"
                      required={true}
                      value={this.state.name}
                      onChange={this.onChangeName}
                      name="name"
                    />
                  </div>
      
                  <div className="form-group" >
                  <div id ="label" ><label htmlFor="description">Opis</label></div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Podaj opis"
                      id="description"
                      required={true}
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                    />
                  </div>

                  <div className="form-group">
                  <div id ="label" ><label htmlFor="address">Adres</label> </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Podaj adres"
                      id="address"
                      required={true}
                      value={this.state.address}
                      onChange={this.onChangeAddress}
                      name="address"
                    />
                  </div>
               
                  <button  className="btn btn-success" type="submit" onClick={this.saveFaculty} >
                    Zatwierdź
                  </button>
                
              </div>
              )}
              </div>
          );
        }
    }

