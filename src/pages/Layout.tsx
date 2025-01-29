import TopNav from '../assets/layout/TopNav';
import BottomNav from '../assets/layout/BottomNav';
import Footer from '../assets/layout/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation - Fixed at the top */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <TopNav />
      </div>

      {/* Main Content (Fills remaining space) */}
      <div className="flex-grow pt-[80px]">
        {/* Adjust pt-[80px] to match the height of TopNav */}
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
        <p>HEllo Baby</p>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
