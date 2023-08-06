import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import StarRating from './StarRating';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10} />
    <StarRating maxRating={5} color="red" />
    <StarRating
      maxRating={3}
      color="teal"
      messages={["Terrible", "Okay", "Good"]}
    />
    <StarRating maxRating={5} color="black" className="star" /> */}
  </React.StrictMode>
);
