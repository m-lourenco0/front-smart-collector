import './index.scss';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,  } from '@fortawesome/free-solid-svg-icons';


const CreateRoute = () => {
    const { auth } = useAuth();

    const [person, setPerson] = useState({});
    const [solicitationList, setSolicitationList] = useState([]);
    const [routeList, setRouteList] = useState([]);
    const navigate = useNavigate();

    const getSolicitations = async () => {
        await axios.get('/solicitation/list',{
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
            setSolicitationList(res.data['data']);
        })
        .catch(err => {
            console.log(err);
            alert('Erro ao buscar solicitações');
        });
    }

    
    useEffect(() => {
        setPerson(auth.logged_user);
        setRouteList([]);
        getSolicitations();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const idList = [];
        routeList.map(item => {
            return idList.push(item.id_Solicitacao);
        })

        await axios.post('service/add', 
            JSON.stringify({id_List: idList}),{
                headers: { 'Content-Type': 'application/json' },
            }
        )
        .then((res) => {
            const status = res.status;
            
            if (status === 200) {
                setRouteList([]);
                // navigate('/service');
            }
        })
        .catch((err) => {
            console.log(err);
            alert('Erro ao criar solicitação');
        });
    }

    const handleVoltar = () => {
        navigate('/service');
    }

    const handleSelectSolicitation = (solicitation) => {
        setRouteList([...routeList, solicitation]);
        setSolicitationList(solicitationList.filter(item => item.id_Solicitacao !== solicitation.id_Solicitacao));
    }

    const handleReturnSolicitation = (solicitation) => {
        setSolicitationList([...solicitationList, solicitation]);
        setRouteList(routeList.filter(item => item.id_Solicitacao !== solicitation.id_Solicitacao));
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <div className='route-header'>
                        <h1>Criar Rota</h1>
                        <div className='header-buttons'>
                            <button className='flat-button' onClick={handleVoltar}>Voltar</button>
                            <button className='flat-button' onClick={handleSubmit}>Salvar</button>
                        </div>
                    </div>
                    <div className='service-info'>
                        <div className='solicitation-table'>  
                        <table className='solicitation-list'>
                            <thead>
                                <tr>
                                    <td>Nº Solicitação</td>
                                    <td>Data da Solicitação</td>
                                    <td>Endereço de coleta</td>
                                    <td>Status</td>
                                    <td className='actions'>Ações</td>
                                </tr>
                            </thead>
                            <tbody>
                                { routeList.map((item) => {

                                    return (
                                        <tr key={item.id_Solicitacao}>
                                            <td>{item.id_Solicitacao}</td>
                                            <td>{item.dt_Solicitacao}</td>
                                            <td>{item.ds_Endereco}</td>
                                            <td>Pendente</td>
                                            <td>
                                                <div className='add-button'>
                                                    <button onClick={() => handleReturnSolicitation(item)} className='update-button'>
                                                        <FontAwesomeIcon icon={faPlus} className='remove-icon' />
                                                    </button>
                                                </div>
                                            </td>
                                            
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    </div>
                    <h1 className='solicitation-text'>Solicitações em aberto:</h1>
                    { solicitationList.length > 0 &&
                    <div className='solicitation-table'>  
                        <table className='solicitation-list'>
                            <thead>
                                <tr>
                                    <td>Nº Solicitação</td>
                                    <td>Data da Solicitação</td>
                                    <td>Endereço de coleta</td>
                                    <td>Status</td>
                                    <td className='actions'>Ações</td>
                                </tr>
                            </thead>
                            <tbody>
                                { solicitationList.map((item) => {

                                    return (
                                        <tr key={item.id_Solicitacao}>
                                            <td>{item.id_Solicitacao}</td>
                                            <td>{item.dt_Solicitacao}</td>
                                            <td>{item.ds_Endereco}</td>
                                            <td>Pendente</td>
                                            <td>
                                                <div className='add-button'>
                                                    <button onClick={() => handleSelectSolicitation(item)} className='update-button'>
                                                        <FontAwesomeIcon icon={faPlus} color='#fff' />
                                                    </button>
                                                </div>
                                            </td>
                                            
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    }
                </div>

                
            </div>
        </>
    );
}

export default CreateRoute;