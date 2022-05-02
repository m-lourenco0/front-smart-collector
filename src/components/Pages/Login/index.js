import './index.scss';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import parseJWT from '../../../helpers/parseJWT';

import axios from '../../../api/axios';
const LOGIN_URL = 'login/'

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErr('');
    }, [user, pass]);

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pass}),
                );
            const token = res.data.token;
            const parsed_token = parseJWT(token);
            const logged_user = parsed_token?.sub
            const roles = res?.data?.permissions;
            setAuth({ user, pass, roles, logged_user, token });
            setUser('');
            setPass('');
            navigate('/home');
        } catch (err) {
            if (!err?.response) {
                setErr('No Server Response');
            } else if (err.response?.status === 400 ) {
                setErr('Invalid Credentials');
            } else if (err.response?.status === 401) {
                setErr('Unauthorized');
            } else {
                setErr('Unknown Error');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <section className='login-form'>
                <form className='login-form-inner' onSubmit={handleSubmit}>
                    <h1 className='title'>Logar</h1>
                    <p ref={errRef} className={err ? 'errmsg' : 'offscreen'} aria-live='assertive'>{err}</p>
                    <label htmlFor='username'>Usuário:</label>
                    <input 
                        type='text' 
                        id='username' 
                        ref={userRef}
                        placeholder='Usuário'
                        autoComplete='off' 
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <label htmlFor='password'>Senha:</label>
                    <input 
                        type='password' 
                        id='password'
                        placeholder='Senha'
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        required
                    />
                    <button className='btn'>Logar</button>
                </form>
            </section>
        </>
        
    );
}

export default Login;