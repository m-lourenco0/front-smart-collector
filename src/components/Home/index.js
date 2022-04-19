import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-s.png';
import './index.scss';
import Logo from './Logo';

const Home = () => {

    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                <span className='text-animate'>Hi,</span>
                <br/>
                <span className='text-animate _13'>I'm mlourenco</span>
                <img src={LogoTitle} alt="developer" />
                <br />
                </h1>
                <h2>Full-Stack Developer / Python Intermediate / React Begginer</h2>
                <Link to='/contact' className='flat-button'>CONTACT ME</Link>
            </div>
            <Logo />
        </div>
    );
}

export default Home;