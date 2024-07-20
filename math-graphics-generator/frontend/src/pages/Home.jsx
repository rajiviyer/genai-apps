import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="py-6">
        <Outlet />
      </section> 
    </>
  )
}
export default Home