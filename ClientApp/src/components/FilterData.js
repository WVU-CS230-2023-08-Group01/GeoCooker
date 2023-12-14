import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterInput = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Update the URL based on the search term
    navigate(`/filter?query=${encodeURIComponent(searchTerm)}`);
    // Perform any other actions related to the search here
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Filter By Tag..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ maxWidth: '150px' }} // You can adjust the maxWidth as needed
      />
      <button className="btn btn-primary btn-sm" onClick={handleSearch}   style={{ fontSize: '14px' }} // You can adjust the font size as needed
>
        Search
      </button>
    </div>
  );
};

export default FilterInput;
