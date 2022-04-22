import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import LogoS from '../../../assets/images/logo-s.png'
import LogoSubtitle from '../../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTruck, faMapLocationDot, faArrowRightFromBracket, faPlusCircle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import RequireAuthNavBar from '../../RequireAuthNavbar';
// import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => {



    return (
        <div className='nav-bar'>
            <Link className='logo' to='/'>
                <img src={LogoS} alt='logo' />
                <img className='sub-logo' src={LogoSubtitle} alt='slobodan' />
            </Link>
            <nav>
                <RequireAuthNavBar allowedRoles={[1000, 2000, 3000]}>
                    <NavLink exact="true" activeclassname='active' to='/home'>
                        <FontAwesomeIcon icon={faHome} color='#4d4d4e' />
                    </NavLink>

                    <RequireAuthNavBar allowedRoles={[2000, 3000]}>
                        <NavLink exact="true" activeclassname='active' className='person' to='/person'>
                            <FontAwesomeIcon icon={faUser} color='#4d4d4e' />
                        </NavLink>
                        <NavLink exact="true" activeclassname='active' className='vehicle' to='/vehicle'>
                            <FontAwesomeIcon icon={faTruck} color='#4d4d4e' />
                        </NavLink>
                    </RequireAuthNavBar>

                    <RequireAuthNavBar allowedRoles={[1000]}>
                        <NavLink exact="true" activeclassname='active' className='new-service' to='/new-service'>
                            <FontAwesomeIcon icon={faPlusCircle} color='#4d4d4e' />
                        </NavLink>
                    </RequireAuthNavBar>

                    <NavLink exact="true" activeclassname='active' className='solicitation' to='/solicitation'>
                        <FontAwesomeIcon icon={faClipboardList} color='#4d4d4e' />
                    </NavLink>
                    <NavLink exact="true" activeclassname='active' className='service' to='/service'>
                        <FontAwesomeIcon icon={faMapLocationDot} color='#4d4d4e' />
                    </NavLink>
                </RequireAuthNavBar>
            </nav>
            <ul>
                <li>
                    <NavLink exact="true" activeclassname='active' className='service' to='/login'>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} color='#4d4d4e' />
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;