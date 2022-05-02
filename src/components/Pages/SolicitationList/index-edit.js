import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import IsAuthorized from '../../IsAuthorized';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const EditSolicitation = () => {
    
    let { id } = useParams();
    const [solicitation, setSolicitation] = useState({});
    const [person, setPerson] = useState({});

    // const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    

    useEffect(() => {
        const getSolicitationData = async (id) => {
            await axiosPrivate.get(`/solicitation/${id}`)
            .then(res => {
                setSolicitation(res.data[0]['data'][0]);
            });
        }
        getSolicitationData(id);
    }, []);

    useEffect(() => {
        const getPersonData = async (id) => {
            await axiosPrivate.get(`/person/${id}`)
            .then(res => {
                setPerson(res.data[0]['data'][0]);
            });
        }
        getPersonData(solicitation.id_Pessoa);
    }, [solicitation]);


    const handleVoltar = () => {
        navigate('/solicitation');
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Visualizar Solicitação
                    </h1>

                    <div className='service-info'>
                        <h3>Número da Solicitação: <span>{solicitation.id_Solicitacao}</span></h3>
                        <h3>Número da Coleta: <span>{solicitation.id_Coleta}</span></h3>
                        <h3>Endereço: <span>{solicitation.ds_Endereco}</span></h3>
                        <h3>Obeservação: <span>{solicitation.ds_Observacao ? solicitation.ds_Observacao : 'Sem observação'}</span></h3>
                        <h3>Data da Solicitação: <span>{solicitation.dt_Solicitacao}</span></h3>
                        <h3>Solicitante: <span>{person.ds_Pessoa}</span></h3>
                    </div>
                    
                    <div className='contact-form'>
{/*                         
                    {service.st_Status !== 'Entregue' && IsAuthorized([2000, 3000]) &&
                    <form onSubmit={handleSubmit(updateSubmit)}>
                        <ul>
                            <li className='half'>
                                <label>Data de Chegada</label>
                                <input type='datetime-local' name='data_chegada' placeholder='Data de Chegada' {...register('data_chegada')}/>
                                {errors.data_chegada && <span className='error'>* Data de chegada é obrigatória</span>}
                            </li>
                            <li className='half'>
                                <label>Status</label>
                                <select type='text' name='status' placeholder='Status' {...register('status', { required: true})}>
                                    <option value='Pendente' selected>Pendente</option>
                                    <option value='Em trânsito'>Em trânsito</option>
                                    <option value='Entregue'>Coleta Realizada</option>
                                </select>
                                {errors.status && <span className='error'>* Status é obrigatório</span>}
                            </li>
                        </ul>
                        
                        <input type='submit' className='service-button' value='Salvar'/>
                    </form>} */}
                        <button className='service-button' onClick={handleVoltar}>Voltar</button>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default EditSolicitation;