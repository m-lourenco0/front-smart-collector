import './index.scss';
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Service = () => {

    const [serviceList, setServiceList] = useState([]);
    const [vehicle, setVehicle] = useState([]);

    const getService = async () => {
        const res = await axios.get('/service',{
            headers: { 'Content-Type': 'application/json' },
        });
        setServiceList(res.data[0]['data']);
    }

    useEffect(() => {
          getService();
      }, []);

    const getVehicleData = async (id) => {
        await axios.get(`/vehicle/${id}`,{
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
            setVehicle(res.data[0]['data'][0]['ds_Veiculo']);
        });
    }

    const deleteService = async (id) => {
        await axios.post(`/service/delete/${id}`,{
            headers: { 'Content-Type': 'application/json' },
        });
        getService();
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Coletas
                    </h1>

                    { serviceList.length > 0 &&
                    <table className='person-list'>
                        <thead>
                            <tr>
                                <td>Nº Coleta</td>
                                <td>Veículo</td>
                                <td>Peso</td>
                                <td>Data de Saída</td>
                                <td>Status</td>
                                <td>Data de Chegada</td>
                                <td className='actions'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            { serviceList.map((item) => {

                                getVehicleData(item.id_Veiculo);

                                return (
                                    <tr key={item.id_Coleta}>
                                        <td>{item.id_Coleta}</td>
                                        <td>{vehicle}</td>
                                        <td>{item.vl_Peso} KG</td>
                                        <td>{item.dt_Saida}</td>
                                        <td>{item.st_Status}</td>
                                        <td>{item.dt_Chegada}</td>
                                        <td className='action-buttons'>
                                            <Link className='update-button' to={"/service/" + item.id_Coleta} >
                                                 <FontAwesomeIcon icon={faMagnifyingGlass} color='#fff' />
                                            </Link>
                                            <button className='update-button'  onClick={() => deleteService(item.id_Coleta)}><FontAwesomeIcon icon={faTrash} color='#d11a2a' /></button>
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