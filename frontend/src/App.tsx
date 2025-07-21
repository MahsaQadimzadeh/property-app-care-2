

// // export default App;
// ////////////////////////////
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import BillUploader from './components/BillUploader';
// import PropertyList from './components/PropertyList'; // ✅ import your new component

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/upload" element={<BillUploader />} />
//       <Route path="/properties" element={<PropertyList />} /> {/* ✅ new route */}
//     </Routes>
//   </Router>
// );

// export default App;
/////////////////////////////////////////////


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import BillUploader from './components/BillUploader';
import PropertyList from './components/PropertyList';
import MainLayout from './components/layouts/MainLayout'; // 💡 layout wrapper

const App = () => (
  <Router>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes wrapped in global layout (e.g., with sidebar, nav, etc.) */}
      <Route
        path="/properties"
        element={
          <MainLayout>
            <PropertyList />
          </MainLayout>
        }
      />
      <Route
        path="/upload"
        element={
          <MainLayout>
            <BillUploader />
          </MainLayout>
        }
      />

      {/* Fallback route (redirect to login for unknown paths) */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;
