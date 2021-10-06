import React, { useState, useEffect } from "react";
import FacultyDataService from "../../services/faculty.service";
import { Link } from "react-router-dom";
import "./faculty.css"

const Faculty = props => {
  const initialFacultyState = {
    id: null,
    name: "",
    description: "",
    address: "",
  };
  const [currentFaculty, setCurrentFaculty] = useState(initialFacultyState);
  const [message, setMessage] = useState("");

  const getFaculty = id => {
    FacultyDataService.get(id)
      .then(response => {
        setCurrentFaculty(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        alert("Niepoprawny adres!");
        window.location.href = "/faculties";
      });
  };

  useEffect(() => {
    getFaculty(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentFaculty({ ...currentFaculty, [name]: value });
  };



  const updateFaculty = () => {
    FacultyDataService.update(currentFaculty.id, currentFaculty)
      .then(response => {
        console.log(response.data);
        setMessage("Wydział został zmieniony!");
      })
      .catch(e => {
        console.log(e);
        setMessage("Uzupełnij wszystkie pola!");
      });
  };


  return (
    <div>
    {currentFaculty ? (
       <div>
        <div id="title">Wydział</div>
          <div className="form-group">
          <div id ="label" > <label htmlFor="title">Nazwa</label></div> 
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={currentFaculty.name}
              required={true}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
          <div id ="label" > <label htmlFor="description">Opis</label></div> 
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentFaculty.description}
              required={true}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
          <div id ="label" ><label htmlFor="address">Adres</label> </div> 
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={currentFaculty.address}
              onChange={handleInputChange}
            />
          </div>

        <button
          type="submit"
          className="btn btn-success"
          onClick={updateFaculty}
        >
          Modyfikuj
        </button>
        <Link
          to={"/faculties"}
          className="btn btn-warning">
                Powrót
        </Link>
        <div id="label">{message}</div>
   </div>
    ) : (
      <div>
        <br />
        <p>Wybierz wydział</p>
      </div>
    )}
  </div>
);
    };

export default Faculty;