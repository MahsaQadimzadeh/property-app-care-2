import React from "react";
import { Link } from "react-router-dom";

const SidebarNavigation = () => {
  return (
    <aside className="w-64 h-full shadow bg-white p-4">
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="font-semibold hover:underline">Dashboard</Link>
        <Link to="/properties" className="font-semibold hover:underline">My Properties</Link>
        <Link to="/projects" className="font-semibold hover:underline">Projects</Link>
        <Link to="/community" className="font-semibold hover:underline">Community</Link>
      </nav>
    </aside>
  );
};

export default SidebarNavigation;