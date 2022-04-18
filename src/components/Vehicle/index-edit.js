import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';

const EditVehicle = () => {
    
    let { id } = useParams();
    const [vehicle, setVehicle] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const getVehicleData = async (id) => {
        await axios.get(`http://10.0.0.2:81/vehicle/${id}`)
        .then(res => {
            setVehicle(res.data[0]['data'][0]);
        });
    }

    useEffect(() => {
        getVehicleData(id);
    } , []);

    const updateSubmit = async (data) => {
        
        console.log(vehicle)
        // await axios.put(`http://10.0.0.2:81/vehicle/${data.id_Veiculo}`, data)
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Editar Veículo
                    </h1>

                    <div className='contact-form'>
                        <form onSubmit={handleSubmit(updateSubmit)}>
                            <ul>
                                <li className='half'>
                                    <label>Veículo</label>
                                    <input onChange={(e) => console.log(e)} type='text' name='nome' placeholder='Veículo' {...register('nome')}/>
                                    {errors.capacidade && <span className='error'>* Nome do veículo é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Capacidade (KG)</label>
                                    <input type='number' name='capacidade' placeholder='Capacidade (KG)' {...register('capacidade')}/>
                                    {errors.capacidade && <span className='error'>* Valor de capacidade é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Placa</label>
                                    <input id='placa' placeholder='Placa' type='text' name='placa' {...register('placa')}/>
                                    {errors.placa && <span className='error'>* Valor da placa é inválido</span>}
                                </li>
                            </ul>
                            <input type='submit' className='flat-button' value='Cadastrar'/>
                        </form>
                        <button className='flat-button' onClick={() => {reset()}}>Limpar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditVehicle;