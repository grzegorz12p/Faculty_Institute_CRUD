import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => (
  <div>
    <h1>Nie znaleziono strony!</h1>
    <Link to="/">
      Wróć do strony głównej
    </Link>
  </div>
);

export default Error;