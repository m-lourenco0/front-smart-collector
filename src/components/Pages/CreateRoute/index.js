import './index.scss';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const CreateRoute = () => {
    const [vehicleList, setVehicleList] = useState([]);
    const [vehicle, setVehicle] = useState({});
    const [solicitationList, setSolicitationList] = useState([]);
    const [routeList, setRouteList] = useState([]);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const getSolicitations = async () => {
        await axiosPrivate.get('/solicitation/list/')
        .then(res => {
            setSolicitationList(res.data['data']);
        })
        .catch(err => {
            alert('Erro ao buscar solicitações');
        });
    }

    const getVehicles = async () => {
        await axiosPrivate.get('/vehicle/')
        .then(res => {
            setVehicleList(res.data[0].data);
        })
        .catch(err => {
            alert('Erro ao buscar veículos');
        });
    }

    
    useEffect(() => {
        setRouteList([]);
        getSolicitations();
        getVehicles();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const idList = [];
        routeList.map(item => {
            return idList.push(item.id_Solicitacao);
        })

        await axiosPrivate.post('service/add', 
            JSON.stringify({id_List: idList, id_Veiculo: vehicle})
        )
        .then((res) => {
            const status = res.status;
            
            if (status === 200) {
                setRouteList([]);
                navigate('/service');
            }
        })
        .catch((err) => {
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

    const handleSelect = (vehicle) => {
        setVehicle(vehicle.target.value);
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <div className='route-header'>
                        <h1>Criar Rota</h1>

                        <div className='vehicle-select'>
                            <span className='vehicle-text'>Veículo: </span>
                            <select type='text' name='vehicle' placeholder='Veículo' className='vehicle-select' onChange={handleSelect} required>
                                {vehicleList.map(item => {
                                    return (
                                        <option key={item.id_Veiculo} value={item.id_Veiculo}>{item.ds_Veiculo}</option>
                                    )
                                })}
                            </select>
                        </div>

                        
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