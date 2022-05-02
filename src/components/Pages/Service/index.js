import './index.scss';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import IsAuthorized from '../../IsAuthorized';

const Service = () => {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [serviceList, setServiceList] = useState([]);

    const getService = async () => {
        const res = await axiosPrivate.get('/service/');
        setServiceList(res.data[0]['data']);
    }

    useEffect(() => {
        getService();
      }, []);

    const deleteService = async (id) => {
        await axiosPrivate.delete(`/service/delete/${id}/`);
        getService();
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                <div className='coletas-header'>
                    <h1>Coletas</h1>
                    <div className='header-buttons'>
                        {IsAuthorized([2000, 3000]) &&
                        <button className='flat-button' onClick={() => navigate('/service/new')}>Nova Coleta</button>}
                    </div>
                    </div>
                    { serviceList.length > 0 &&
                    <table className='person-list'>
                        <thead>
                            <tr>
                                <td>Nº Coleta</td>
                                <td>Veículo</td>
                                <td>Peso</td>
                                <td>Data de Saída</td>
                                <td>Status</td>
                                <td>Data de Solicitação</td>
                                <td className='actions'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            { serviceList.map((item) => {

                                return (
                                    <tr key={item.id_Coleta}>
                                        <td>{item.id_Coleta}</td>
                                        <td>{item.ds_Veiculo ? `${item.ds_Veiculo} (${item.cd_Placa})` : 'Não atribuído'}</td>
                                        <td>{item.vl_Peso? `${item.vl_Peso} KG` : ''}</td>
                                        <td>{item.dt_Saida}</td>
                                        <td>{item.st_Status}</td>
                                        <td>{item.dt_Solicitacao}</td>
                                        <td className='action-buttons'>
                                            <Link className='update-button' to={"/service/" + item.id_Coleta} >
                                                 <FontAwesomeIcon icon={faMagnifyingGlass} color='#fff' />
                                            </Link>
                                            {IsAuthorized([2000, 3000]) &&
                                            <button className='update-button' onClick={() => deleteService(item.id_Coleta)}><FontAwesomeIcon icon={faTrash} color='#d11a2a' /></button>}
                                            
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

export default Service;