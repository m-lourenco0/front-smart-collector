import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import LogoS from '../../assets/images/logo-s.png'
import LogoSubtitle from '../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTruck, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => {
    return (
        <div className='nav-bar'>
            <Link className='logo' to='/'>
                <img src={LogoS} alt='logo' />
                <img className='sub-logo' src={LogoSubtitle} alt='slobodan' />
            </Link>
            <nav>
                <NavLink exact="true" activeclassname='active' to='/'>
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
                    <a target='_blank'  rel='noreferrer' href='https://www.linkedin.com'>
                        <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e' />
                    </a>
                </li>
                <li>
                    <a target='_blank'  rel='noreferrer' href='https://github.com/m-lourenco0'>
                        <FontAwesomeIcon icon={faGithub} color='#4d4d4e' />
                    </a>
                </li>
                <li>
                    <a target='_blank'  rel='noreferrer' href='https://www.youtube.com/watch?v=LoFGmZ_h_rM'>
                        <FontAwesomeIcon icon={faYoutube} color='#4d4d4e' />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;