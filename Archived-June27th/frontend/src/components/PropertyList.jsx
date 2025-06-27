import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState('Philadelphia');

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`/api/properties?forSale=true&location=${location}`);
      setProperties(res.data);
    } catch (err) {
      console.error('Error fetching properties:', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [location]);

  return (
    <div>
      <h2>🏡 Properties for Sale</h2>

      <label>
        Search by Location: &nbsp;
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Philadelphia"
        />
      </label>

      <ul>
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          properties.map((property) => (
            <li key={property._id} style={{ border: '1px solid #ccc', margin: '1em 0', padding: '1em' }}>
              <p><strong>Address:</strong> {property.address}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Owner:</strong> {property.ownerId}</p>
              <p><strong>Projects:</strong> {property.projects?.length || 0}</p>
              <div>
                {property.images?.map((url, idx) => (
                  <img key={idx} src={url} alt={`Property ${idx}`} width={150} style={{ marginRight: 8 }} />
                ))}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PropertyList;
