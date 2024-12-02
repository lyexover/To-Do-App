import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Dropdown() {
  const params = useParams();
  const navigate = useNavigate();
  const userID = params.userID;

  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch(`http://localhost:3000/api/categories/${userID}`);
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }
    fetchOptions();
  }, [userID]);

  const handleChange = (event) => {
    const selectedOption = options.find(option => option.name === event.target.value);
    if (selectedOption) {
      setSelectedValue(event.target.value);
      navigate(`/home/${userID}/barChart/chart/${selectedOption.id}`);
    }
  };

  return (
    <div>
      
      <select id="dropdown" value={selectedValue} onChange={handleChange}>
        <option value="" disabled>
          -- Select an option --
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      
    </div>
  );
}

export default Dropdown;