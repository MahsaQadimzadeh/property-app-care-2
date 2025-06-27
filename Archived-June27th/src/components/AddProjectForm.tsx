

import React, { useState } from "react";
import { addProject } from "../services/firestoreService";

export default function AddProjectForm() {
  const [name, setName] = useState("");
  const [contractor, setContractor] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedCost = parseFloat(cost);
    if (isNaN(parsedCost) || parsedCost < 0) {
      alert("Please enter a valid positive number for cost.");
      return;
    }

    try {
      await addProject({ name, contractor, cost: parsedCost });
      alert("✅ Project added!");
      setName("");
      setContractor("");
      setCost("");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("❌ Failed to add project.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 rounded p-2 w-full"
      />
      <input
        type="text"
        placeholder="Contractor"
        value={contractor}
        onChange={(e) => setContractor(e.target.value)}
        required
        className="border border-gray-300 rounded p-2 w-full"
      />
      <input
        type="number"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        required
        min="0"
        step="0.01"
        className="border border-gray-300 rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full font-semibold"
      >
        Add Project
      </button>
    </form>
  );
}

//////////////////////////////////////////////
// import React, { useState } from "react";
// import { addProject } from "../services/firestoreService";

// export default function AddProjectForm() {
//   const [name, setName] = useState("");
//   const [contractor, setContractor] = useState("");
//   const [cost, setCost] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const parsedCost = parseFloat(cost);
//     if (isNaN(parsedCost) || parsedCost < 0) {
//       alert("Please enter a valid positive number for cost.");
//       return;
//     }

//     try {
//       await addProject({ name, contractor, cost: parsedCost });
//       alert("✅ Project added!");
//       setName("");
//       setContractor("");
//       setCost("");
//     } catch (error) {
//       console.error("Error adding project:", error);
//       alert("❌ Failed to add project.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//       <input
//         type="text"
//         placeholder="Project name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//         className="border border-gray-300 rounded p-2 w-full"
//       />
//       <input
//         type="text"
//         placeholder="Contractor"
//         value={contractor}
//         onChange={(e) => setContractor(e.target.value)}
//         required
//         className="border border-gray-300 rounded p-2 w-full"
//       />
//       <input
//         type="number"
//         placeholder="Cost"
//         value={cost}
//         onChange={(e) => setCost(e.target.value)}
//         required
//         min="0"
//         step="0.01"
//         className="border border-gray-300 rounded p-2 w-full"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full font-semibold"
//       >
//         Add Project
//       </button>
//     </form>
//   );
// }


///////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { addProject } from "../services/firestoreService";

// export default function AddProjectForm() {
//   const [name, setName] = useState("");
//   const [contractor, setContractor] = useState("");
//   const [cost, setCost] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await addProject({ name, contractor, cost: parseFloat(cost) });
//       alert("Project added!");
//       setName("");
//       setContractor("");
//       setCost("");
//     } catch {
//       alert("Failed to add project");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         placeholder="Project name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//         className="border p-2 w-full"
//       />
//       <input
//         type="text"
//         placeholder="Contractor"
//         value={contractor}
//         onChange={(e) => setContractor(e.target.value)}
//         required
//         className="border p-2 w-full"
//       />
//       <input
//         type="number"
//         placeholder="Cost"
//         value={cost}
//         onChange={(e) => setCost(e.target.value)}
//         required
//         className="border p-2 w-full"
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Add Project
//       </button>
//     </form>
//   );
// }
