// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

/////////////


////////////////////
// import React from 'react';
// import PropertyList from './components/PropertyList';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <h1>Community Listings</h1>
//       <PropertyList />
//     </div>
//   );
// };

// export default App;
////////////////////////////
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import BillUploader from './components/BillUploader';

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/upload" element={<BillUploader />} />
//     </Routes>
//   </Router>
// );

// export default App;
////////////////////////////
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import BillUploader from './components/BillUploader';
import PropertyList from './components/PropertyList'; // ✅ import your new component

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={<BillUploader />} />
      <Route path="/properties" element={<PropertyList />} /> {/* ✅ new route */}
    </Routes>
  </Router>
);

export default App;

