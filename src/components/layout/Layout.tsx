import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#000000]">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="min-h-screen px-4 pt-16 pb-8 lg:px-8 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
