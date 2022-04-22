import './index.scss';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AddSolicitation = () => {
    const { auth } = useAuth();

    const [person, setPerson] = useState({});
    const [obs, setObs] = useState(null);

    const navigate = useNavigate();

    
    useEffect(() => {
        setPerson(auth.logged_user);
    }, []);

    const handleSubmit = async (data) => {
        data.preventDefault();

        await axios.post('solicitation/add', 
            JSON.stringify({
                id_Pessoa: person.id_Pessoa,
                ds_Endereco: person.ds_Endereco,
                ds_Bairro: person.ds_Bairro,
                nr_Endereco: person.nr_Endereco,
                dt_Solicitacao: new Date().toLocaleDateString('pt-BR'),
                ds_Observacao: obs,
            }),{
                headers: { 'Content-Type': 'application/json' },
            }
        )
        .then((res) => {
            const status = res.status;
            
            if (status === 200) {
                setPerson({});
                setObs('');
                navigate('/solicitation');
            }
        })
        .catch((err) => {
            console.log(err);
            alert('Erro ao criar solicitação');
        });
    }

    const handleVoltar = () => {
        navigate('/solicitation');
    }
    
    

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Nova Coleta
                    </h1>

                    <div className='service-info'>
                        <form className='coleta-input' onSubmit={handleSubmit}>
                            {/* <p ref={errRef} className={err ? 'errmsg' : 'offscreen'} aria-live='assertive'>{err}</p> */}
                            <h3>Endereço:</h3>
                            <input 
                                type='text' 
                                name='endereco'
                                placeholder='Endereço'
                                value={person.ds_Endereco}
                                onChange={(e) => {setPerson({...person, ds_Endereco: e.target.value})}}
                                required
                            />
                            <h3 >Bairro:</h3>
                            <input 
                                type='text' 
                                name='bairro'
                                placeholder='Bairro'
                                value={person.ds_Bairro}
                                onChange={(e) => {setPerson({...person, ds_Bairro: e.target.value})}}
                                required
                            />
                            <h3 >Número:</h3>
                            <input 
                                type='number'
                                name='numero'
                                placeholder='Número'
                                value={person.nr_Endereco}
                                onChange={(e) => {setPerson({...person, nr_Endereco: e.target.value})}}
                                required
                            />
                            <h3>Observações:</h3>
                            <textarea onChange={(e) => setObs(e.target.value)} />
                            <div className='contact-form'>
                                <button className='flat-button' type='submit'>Salvar</button>
                                <button className='flat-button' onClick={handleVoltar}>Voltar</button>
                            </div>
                        </form>
                        <h3>Data de Solicitação: <span>{new Date().toLocaleDateString('pt-BR')}</span></h3>
                        <h3>Usuário Solicitante: <span>{person.ds_Pessoa}</span></h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddSolicitation;