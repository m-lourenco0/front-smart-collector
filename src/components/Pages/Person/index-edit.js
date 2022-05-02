import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';

const EditPerson = () => {
    
    let { id } = useParams();
    const [person, setPerson] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const getPersonData = async (id) => {
        await axiosPrivate.get(`/person/${id}`)
        .then(res => {
            setPerson(res.data[0]['data'][0]);
        });
    }

    useEffect(() => {
        getPersonData(id);
    }, [id]);

    const updateSubmit = async (data) => {
        await axiosPrivate.put(`/person/`, {
            id: id,
            nome: data.nome.length > 0  ? data.nome : person.ds_Pessoa,
            endereco: data.endereco.length > 0  ? data.endereco : person.ds_Endereco,
            bairro: data.bairro.length > 0 ? data.bairro : person.ds_Bairro,
            numero: data.numero.length > 0  ? data.numero : person.nr_Endereco,
            login: data.login.length > 0  ? data.login : person.ds_Login,
            senha: data.senha.length > 0  ? data.senha : person.ds_Senha,
        })
        .then((res) => {
            const status = res.status;

            if (status === 200) {
                navigate('/person');
            }
        })
        .catch(e => {
            alert('Erro ao atualizar pessoa');
        })
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Editar Pessoa
                    </h1>

                    <div className='contact-form'>
                    <form onSubmit={handleSubmit(updateSubmit)}>
                            <ul>
                                <li className='half'>
                                    <label>Nome: </label>
                                    <input defaultValue={person.ds_Pessoa} type='text' name='nome' placeholder='Nome' {...register('nome')}/>
                                    {errors.nome && <span className='error'>* Nome da pessoa é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Endereço: </label>
                                    <input defaultValue={person.ds_Endereco} type='text' name='endereco' placeholder='Endereco' {...register('endereco')}/>
                                    {errors.endereco && <span className='error'>* Valor de endereco é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Bairro: </label>
                                    <input defaultValue={person.ds_Bairro} type='text' name='bairro' placeholder='Bairro' {...register('bairro')}/>
                                    {errors.bairro && <span className='error'>* Valor de bairro é inválido</span>}
                                </li>
                            </ul>
                            <ul>
                                <li className='half'>
                                    <label>Número: </label>
                                    <input defaultValue={person.nr_Endereco} type='number' name='numero' placeholder='Número' {...register('numero')}/>
                                    {errors.numero && <span className='error'>* Valor de número é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Login: </label>
                                    <input defaultValue={person.ds_Login} type='text' name='login' placeholder='Login' {...register('login')}/>
                                    {errors.login && <span className='error'>* Valor de login é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Senha: </label>
                                    <input defaultValue={person.ds_Senha} type='text' name='senha' placeholder='Senha' {...register('senha')}/>
                                    {errors.senha && <span className='error'>* Valor de senha é inválido</span>}
                                </li>
                            </ul>
                            <input type='submit' className='person-button' value='Atualizar'/>
                        </form>
                        <button className='vehicle-button' onClick={() => navigate('/person')}>Voltar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditPerson;