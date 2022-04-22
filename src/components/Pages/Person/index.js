import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Person = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [personList, setPersonList] = useState([]);

    const getPerson = async () => {
        const res = await axios.get('/person', {
            headers: { 'Content-Type': 'application/json' },
        });
        setPersonList(res.data[0]['data']);
    }

    useEffect(() => {
          getPerson();
      }, []);

    const onSubmit = async (data) => {
        await axios.post('/person/add', data, {
            headers: { 'Content-Type': 'application/json' },
        })
        getPerson();
        reset();
    }

    const deletePerson = async (id) => {
        await axios.delete(`/person/delete/${id}`,{
            headers: { 'Content-Type': 'application/json' },
        });
        getPerson();
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Pessoas
                    </h1>

                    <div className='contact-form'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ul>
                                <li className='half'>
                                    <label>Nome: </label>
                                    <input type='text' name='nome' placeholder='Nome' {...register('nome', { required: true })}/>
                                    {errors.nome && <span className='error'>* Nome da pessoa é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Endereço: </label>
                                    <input type='text' name='endereco' placeholder='Endereco' {...register('endereco', { required: true })}/>
                                    {errors.endereco && <span className='error'>* Valor de endereco é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Bairro: </label>
                                    <input type='text' name='bairro' placeholder='Bairro' {...register('bairro', { required: true })}/>
                                    {errors.bairro && <span className='error'>* Valor de bairro é inválido</span>}
                                </li>
                            </ul>
                            <ul>
                                <li className='half'>
                                    <label>Número: </label>
                                    <input type='number' name='numero' placeholder='Número' {...register('numero', { required: true, minLength: 1 })}/>
                                    {errors.numero && <span className='error'>* Valor de número é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Login: </label>
                                    <input type='text' name='login' placeholder='Login' {...register('login', { required: true, minLength: 5 })}/>
                                    {errors.login && <span className='error'>* Valor de login é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Senha: </label>
                                    <input type='text' name='senha' placeholder='Senha' {...register('senha', { required: true, minLength: 8 })}/>
                                    {errors.senha && <span className='error'>* Valor de senha é inválido</span>}
                                </li>
                            </ul>
                            <input type='submit' className='person-button' value='Cadastrar'/>
                        </form>
                    </div>

                    { personList.length > 0 &&
                    <table className='person-list'>
                        <thead>
                            <tr>
                                <td>Nome</td>
                                <td>Endereço</td>
                                <td>Bairro</td>
                                <td>Número</td>
                                <td className='actions'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            { personList.map((item) => {
                                return (
                                    <tr key={item.id_Pessoa}>
                                        <td>{item.ds_Pessoa}</td>
                                        <td>{item.ds_Endereco}</td>
                                        <td>{item.ds_Bairro}</td>
                                        <td>{item.nr_Endereco}</td>
                                        <td className='action-buttons'>
                                            <Link className='update-button' to={"/person/" + item.id_Pessoa} >
                                                 <FontAwesomeIcon icon={faPen} color='#fff' />
                                            </Link>
                                            <button className='update-button'  onClick={() => deletePerson(item.id_Pessoa)}><FontAwesomeIcon icon={faTrash} color='#d11a2a' /></button>
                                        </td>
                                        
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}

                </div>
            </div>
        </>
    );
}

export default Person;