import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import LogoS from '../../assets/images/logo-s.png'
import LogoSubtitle from '../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTruck, faMapLocationDot, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Logout from '../Logout';

const Sidebar = () => {
    return (
        <div className='nav-bar'>
            <Link className='logo' to='/'>
                <img src={LogoS} alt='logo' />
                <img className='sub-logo' src={LogoSubtitle} alt='slobodan' />
            </Link>
            <nav>
                <NavLink exact="true" activeclassname='active' to='/home'>
                    <FontAwesomeIcon icon={faHome} color='#4d4d4e' />
                </NavLink>
                <NavLink exact="true" activeclassname='active' className='vehicle' to='/vehicle'>
                    <FontAwesomeIcon icon={faTruck} color='#4d4d4e' />
                </NavLink>
                <NavLink exact="true" activeclassname='active' className='person' to='/person'>
                    <FontAwesomeIcon icon={faUser} color='#4d4d4e' />
                </NavLink>
                <NavLink exact="true" activeclassname='active' className='service' to='/service'>
                    <FontAwesomeIcon icon={faMapLocationDot} color='#4d4d4e' />
                </NavLink>
                
            </nav>
            <ul>
                <li>
                    <NavLink exact="true" activeclassname='active' className='service' to='/login'>
                        <Logout />
                        <FontAwesomeIcon icon={faArrowRightFromBracket} color='#4d4d4e' />
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;