import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';

const Layout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>

      {/* footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
