import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Dashboard() {
  const uid = "demo-user-123";
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/property/${uid}`)
      .then(res => res.json())
      .then(setProperties);
  }, [uid]);

  const handleSelect = (propertyId) => {
    setSelected(propertyId);
    fetch(`http://localhost:5000/api/project/by-property/${propertyId}`)
      .then(res => res.json())
      .then(setProjects);
  };

  const logout = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h3 className="text-lg font-semibold mb-2">Properties</h3>
        <ul>
          {properties.map(p => (
            <li key={p._id} onClick={() => handleSelect(p._id)} className="cursor-pointer hover:underline">
              {p.title}
            </li>
          ))}
        </ul>
        <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <div className="flex-1 p-4">
        {selected ? (
          <>
            <h3 className="text-xl font-bold mb-3">Projects</h3>
            <ul>
              {projects.map(pr => (
                <li key={pr._id} className="border-b py-2">{pr.title} - ${pr.cost}</li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-500">Select a property to view projects</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
