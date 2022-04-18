import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../ModalVehicle';

const Vehicle = () => {

    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [vehicleList, setVehicleList] = useState([]);
    const [editVehicle, setEditVehicle] = useState('');
    const [showModal, setShowModal] = useState(false);

    const getVehicles = async () => {
        const res = await axios.get('http://10.0.0.2:81/vehicle');
        setVehicleList(res.data[0]['data']);
    }

    const getVehicleData = async (id) => {
        await axios.get(`http://10.0.0.2:81/vehicle/${id}`)
        .then(res => {
            setEditVehicle(res.data[0]['data'][0]);
        });
    }

    useEffect(() => {
          getVehicles();
      }, []);

    const onSubmit = async (data) => {
        await axios.post('http://10.0.0.2:81/vehicle/add', data)
        getVehicles();
        reset();
    }

    const updateSubmit = async (data) => {
        await axios.post(`http://10.0.0.2:81/vehicle/${data.id_Veiculo}`, data)
        getVehicles();
        reset();
    }

    const deleteVehicle = async (id) => {
        await axios.post(`http://10.0.0.2:81/vehicle/delete/${id}`);
        getVehicles();
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Veículos
                    </h1>

                    <div className='contact-form'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ul>
                                <li className='half'>
                                    <label>Veículo</label>
                                    <input defaultValue={editVehicle.ds_Veiculo} type='text' name='nome' placeholder='Veículo' {...register('nome', { required: true })}/>
                                    {errors.capacidade && <span className='error'>* Nome do veículo é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Capacidade (KG)</label>
                                    <input defaultValue={editVehicle.vl_CapacidadeKG} type='number' name='capacidade' placeholder='Capacidade (KG)' {...register('capacidade', { required: true })}/>
                                    {errors.capacidade && <span className='error'>* Valor de capacidade é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Placa</label>
                                    <input defaultValue={editVehicle.cd_Placa} id='placa' placeholder='Placa' type='text' name='placa' {...register('placa', { required: true, maxLength: 8 })}/>
                                    {errors.placa && <span className='error'>* Valor da placa é inválido</span>}
                                </li>
                            </ul>
                            <input type='submit' className='flat-button' value='Cadastrar'/>
                        </form>
                        <button className='flat-button' onClick={() => {reset(); setEditVehicle('')}}>Limpar</button>
                    </div>

                    { vehicleList.length > 0 &&
                    <table className='vehicle-list'>
                        <thead>
                            <tr>
                                <td>Veículo</td>
                                <td>Capacidade KG</td>
                                <td>Placa</td>
                                <td className='actions'>Ações</td>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleList.map((item) => {
                                return (
                                    <tr key={item.id_Veiculo}>
                                        <td>{item.ds_Veiculo}</td>
                                        <td>{item.vl_CapacidadeKG} KG</td>
                                        <td>{item.cd_Placa}</td>
                                        <td className='action-buttons'>
                                            <button className='update-button' onClick={ () => { reset(); getVehicleData(item.id_Veiculo);}}>
                                                <FontAwesomeIcon icon={faPen} color='#fff' />
                                            </button>
                                            <button className='update-button' onClick={() => deleteVehicle(item.id_Veiculo)}><FontAwesomeIcon icon={faTrash} color='#d11a2a' /></button>
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

export default Vehicle;