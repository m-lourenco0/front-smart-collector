import { useForm } from 'react-hook-form';
import axios from 'axios';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset} = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        await axios.post('http://10.0.0.2:81/login/', data)
        .then(res => {
            if (res.status === 200) {
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/home');
            }
        })
        reset();
    }

    return (
            <div className="login-container">
                <div className="login-form">
                    <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
                        <h1>Login</h1>
                        <ul>
                            <li>
                                <label>Username</label>
                                <input type='text' name='user' placeholder='Username' {...register('user', { required: true })}/>
                                {errors.user && <span className='error'>* Usuário é inválido</span>}
                            </li>
                            <li>
                                <label>Password</label>
                                <input type='text' name='pass' placeholder='Password' {...register('pass', { required: true })}/>
                                {errors.pass && <span className='error'>* Senha é inválida</span>}
                            </li>
                            <input type='submit' className='submit-button' value='Login'/>
                        </ul>
                    </form>
                </div>
            </div>
    );
}

export default Login;