import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditService = () => {
    
    let { id } = useParams();
    const [service, setService] = useState({});
    const [vehicle, setVehicle] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    const getServiceData = async (id) => {
        await axios.get(`http://10.0.0.2:81/service/${id}`)
        .then(res => {
            setService(res.data[0]['data'][0]);
            getVehicleData(res.data[0]['data'][0].id_Veiculo);
        });
    }

    const getVehicleData = async (id) => {
        await axios.get(`http://10.0.0.2:81/vehicle/${id}`)
        .then(res => {
            setVehicle(res.data[0]['data'][0]);
        });
    }

    useEffect(() => {
        getServiceData(id);
    }, [id]);

    const updateSubmit = async (data) => {
        await axios.put(`http://10.0.0.2:81/service/`, {
            id: id,
            veiculo: service.id_Veiculo,
            peso: service.vl_Peso,
            data_saida: service.dt_Saida,
            data_chegada: data.data_chegada,
            status: data.status
        })
        .then((res) => {
            const status = res.status;

            if (status === 200) {
                window.location.href = '/service';
            }
        })
        .catch(e => {
            console.log(e);
            alert('Erro ao atualizar coleta');
        })
    }

    const handleVoltar = () => {
        window.location.href = '/service';
    }
    

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Visualizar Coleta
                    </h1>

                    <div className='service-info'>
                        <h3>Número da Coleta: <span>{service.id_Coleta}</span></h3>
                        <h3>Veículo: <span>{vehicle.ds_Veiculo}</span></h3>
                        <h3>Placa: <span>{vehicle.cd_Placa}</span></h3>
                        <h3>Peso: <span>{service.vl_Peso} KG</span></h3>
                        <h3>Data de Saída: <span>{service.dt_Saida}</span></h3>
                        <h3>Data de Chegada: <span>{service.dt_Chegada ? service.dt_Chegada : 'Sem data'}</span></h3>
                        <h3>Status: <span>{service.st_Status}</span></h3>
                    </div>

                    <div className='contact-form'>
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
                            <input type='submit' className='flat-button' value='Salvar'/>
                        </form>
                        <button className='flat-button' onClick={handleVoltar}>Voltar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditService;