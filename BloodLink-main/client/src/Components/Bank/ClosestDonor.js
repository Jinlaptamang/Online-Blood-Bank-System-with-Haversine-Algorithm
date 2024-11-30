import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../Api';

const ClosestDonorsPage = () => {
  const { bankId, requestedBG } = useParams();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonors = async () => {
    
      
    };
    
    fetchDonors();
  }, [bankId, requestedBG]);
  console.log(donors)
    
    // const BloodGroupDropdown = ({ onSelect }) => {
    const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  
    const handleSelect = (event) => {
      const selectedValue = event.target.value;
      setSelectedBloodGroup(selectedValue);
      // if (onSelect) {
      //   onSelect(selectedValue); // Notify parent component about the selection
      // }
    };
  // }

  const handleSearch  =(e) => {
    e.preventDefault()
    try {

      console.log("this is response")
        axios.get(`/user/donors/closest/${bankId}/${selectedBloodGroup}`)
      .then((response) => {   
        if(response.status == 200){
          const data = response.data
          setDonors(data.donors)
        }
      })
      .catch(err => console.log(err))
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Closest Donors</h1>

      <div>
      <label htmlFor="blood-group" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
        Select Blood Group
      </label>
      <select
        id="blood-group"
        value={selectedBloodGroup}
        onChange={handleSelect}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blood focus:border-blood block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blood dark:focus:border-blood"
      >
        <option value="" disabled>
          Choose a blood group
        </option>
        {bloodGroups.map((group, index) => (
          <option key={index} value={group}>
            {group}
          </option>
        ))}
      </select>

      <input type='button' className='bg-purple text-center text-white-900 rounded-lg mt-4 px-4 py-2' onClick={handleSearch} value="submit"/>
    </div>

    { donors && <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-700">
            <th className="px-6 py-3 text-gray-600 dark:text-gray-400 font-medium">Name</th>
            <th className="px-6 py-3 text-gray-600 dark:text-gray-400 font-medium">Phone</th>
            <th className="px-6 py-3 text-gray-600 dark:text-gray-400 font-medium">Blood Group</th>
            <th className="px-6 py-3 text-gray-600 dark:text-gray-400 font-medium">Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 dark:border-gray-700 ${
                index % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
              }`}
            >
              <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{donor.name}</td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{donor.phone}</td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{donor.bloodGroup}</td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-300">{donor.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>}
        
    </>
  );
};

export default ClosestDonorsPage;
