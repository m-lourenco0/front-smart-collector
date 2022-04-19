import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditVehicle = () => {
    
    let { id } = useParams();
    const [vehicle, setVehicle] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();

    const getVehicleData = async (id) => {
        await axios.get(`http://10.0.0.2:81/vehicle/${id}`)
        .then(res => {
            setVehicle(res.data[0]['data'][0]);
        });
    }

    useEffect(() => {
        getVehicleData(id);
    }, [id]);

    const updateSubmit = async (data) => {
        console.log(data.nome)
        await axios.put(`http://10.0.0.2:81/vehicle/`, {
            id: id,
            nome: data.nome.length > 0  ? data.nome : vehicle.ds_Veiculo,
            capacidade: data.capacidade.length > 0  ? data.capacidade : vehicle.vl_CapacidadeKG,
            placa: data.placa.length > 0 ? data.placa : vehicle.cd_Placa,
        })
        .then((res) => {
            const status = res.status;

            if (status === 200) {
                navigate('/vehicle');
            }
        })
        .catch(e => {
            console.log(e);
            alert('Erro ao atualizar veículo');
        })
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
                                    <input defaultValue={vehicle.ds_Veiculo} type='text' name='nome' placeholder='Veículo' {...register('nome')}/>
                                    {errors.capacidade && <span className='error'>* Nome do veículo é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Capacidade (KG)</label>
                                    <input defaultValue={vehicle.vl_CapacidadeKG} type='number' name='capacidade' placeholder='Capacidade (KG)' {...register('capacidade')}/>
                                    {errors.capacidade && <span className='error'>* Valor de capacidade é inválido</span>}
                                </li>
                                <li className='half'>
                                    <label>Placa</label>
                                    <input defaultValue={vehicle.cd_Placa} id='placa' placeholder='Placa' type='text' name='placa' {...register('placa')}/>
                                    {errors.placa && <span className='error'>* Valor da placa é inválido</span>}
                                </li>
                            </ul>
                            <input type='submit' className='flat-button' alt='Salvar' value='Atualizar'/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditVehicle;