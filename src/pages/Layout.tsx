import { Outlet } from "react-router-dom";
import TopNav from '../components/layout/TopNav';
import BottomNav from '../components/layout/BottomNav';
import Footer from '../components/layout/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation - Fixed at the top */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <TopNav />
      </div>

      {/* Main Content (Fills remaining space) */}
      <div className="flex-grow ">
        <Outlet />
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
        <p>Testing</p>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
