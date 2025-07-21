import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar, Header, etc. can go here */}
      <aside className="w-64 bg-gray-100 p-4">Sidebar</aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default MainLayout;
