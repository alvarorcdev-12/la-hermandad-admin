import { Outlet } from 'react-router';

import { Sidebar } from '../components/admin/Sidebar';
import { TopNav } from '../components/admin/TopNav';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="h-16 ">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-4 bg-muted dark:bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
