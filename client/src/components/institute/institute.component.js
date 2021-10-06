import React, { useState, useEffect } from "react";
import InstituteDataService from "../../services/institute.service";
import { Link } from "react-router-dom";
import "./institute.css"

const Institute = props => {
  const initialInstituteState = {
    id: null,
    name: "",
    description: "",
    director: "",
  };
  const [currentInstitute, setCurrentInstitute] = useState(initialInstituteState);
  const [message, setMessage] = useState("");

  const getInstitute = id => {
    InstituteDataService.get(props.match.params.id,id)
      .then(response => {
        setCurrentInstitute(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        alert("Niepoprawny adres!");
        window.location.href = "/faculties";
      });
  };


  useEffect(() => {
    getInstitute(props.match.params.instituteId);
  }, [props.match.params.instituteId]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentInstitute({ ...currentInstitute, [name]: value });
  };



  const updateInstitute = () => {
    InstituteDataService.update(props.match.params.id,currentInstitute.id, currentInstitute)
      .then(response => {
        console.log(response.data);
        setMessage("Instytut został zmieniony!");
      })
      .catch(e => {
        console.log(e);
        setMessage("Uzupełnij wszystkie pola!");
      });
  };


  return (
    <div>
    {currentInstitute ? (
        <div>
        <div id="title">Instytut</div>
          <div className="form-group">
          <div id ="label"><label htmlFor="title">Nazwa</label></div>
            <input
              type="text"
              className="form-control"
              id="name"
              required={true}
              name="name"
              value={currentInstitute.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
          <div id ="label"><label htmlFor="description">Opis</label></div>
            <input
              type="text"
              className="form-control"
              id="description"
              required={true}
              name="description"
              value={currentInstitute.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
          <div id ="label"><label htmlFor="director">Dyrektor</label></div>
            <input
              type="text"
              className="form-control"
              id="director"
              name="director"
              value={currentInstitute.director}
              onChange={handleInputChange}
            />
          </div>


          <button
          type="submit"
          className="btn btn-success"
          onClick={updateInstitute}
        >
          Modyfikuj
        </button>
        

        <Link
                to={"/faculties/" + props.match.params.id + "/institutes"}
                className="btn btn-warning"
              >
                Powrót
        </Link>
        <div id="label">{message}</div>
        </div>
    ) : (
      <div>
        <br />
        <p>Wybierz Instytut</p>
      </div>
    )}
  </div>
);
    };

export default Institute;