import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Vehicle = () => {

    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [vehicleList, setVehicleList] = useState([]);
    const axiosPrivate = useAxiosPrivate();


    const getVehicles = async () => {
        const res = await axiosPrivate.get('/vehicle/');
        setVehicleList(res.data[0]['data']);
    }

    useEffect(() => {
          getVehicles();
      }, []);

    const onSubmit = async (data) => {
        await axiosPrivate.post('/vehicle/add', data)
        getVehicles();
        reset();
    }

    const deleteVehicle = async (id) => {
        await axiosPrivate.delete(`/vehicle/delete/${id}`);
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
                                    <label>Veículo: </label>
                                    <input type='text' name='nome' placeholder='Veículo' {...register('nome', { required: true })}/>
                                    {errors.capacidade && <span className='error'>* Nome do veículo é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Capacidade (KG): </label>
                                    <input type='number' name='capacidade' placeholder='Capacidade (KG)' {...register('capacidade', { required: true })}/>
                                    {errors.capacidade && <span className='error'>* Valor de capacidade é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Placa: </label>
                                    <input id='placa' placeholder='Placa' type='text' name='placa' {...register('placa', { required: true, maxLength: 8 })}/>
                                    {errors.placa && <span className='error'>* Valor da placa é inválido</span>}
                                </li>
                            </ul>
                            <input type='submit' className='vehicle-button' value='Cadastrar'/>
                        </form>
                        <button className='vehicle-button' onClick={() => {reset()}}>Limpar</button>
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
                                            <Link className='update-button' to={"/vehicle/" + item.id_Veiculo} >
                                                 <FontAwesomeIcon icon={faPen} color='#fff' />
                                            </Link>
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