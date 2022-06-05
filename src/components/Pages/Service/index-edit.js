import './index.scss';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import IsAuthorized from '../../IsAuthorized';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const EditService = () => {
    
    let { id } = useParams();
    const [service, setService] = useState({});
    const [directions, setDirections] = useState(/** @type google.maps.DirectionsResult */ (null));

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const center = {lat: -22.37498309146081, lng: -47.37011743571834}
    const axiosPrivate = useAxiosPrivate();
    

    useEffect(() => {
        const getServiceData = async (id) => {
            await axiosPrivate.get(`/service/${id}`)
            .then(res => {
                setService(res.data[0]['data'][0]);
            });
        }
        getServiceData(id);
    }, [id]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const updateSubmit = async (data) => {
        await axiosPrivate.put(`/service/`, {
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
                navigate('/service');
            }
        })
        .catch(e => {
            alert('Erro ao atualizar coleta');
        })
    }

    const handleVoltar = () => {
        navigate('/service');
    }
    
    async function calculateRoute() {
        const waypoint = service?.ds_Waypoints.split('|');
        const waypoints = waypoint.map (waypoint => {
            return {
                location: waypoint,
                stopover: true
            }
        })

        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: service.ds_Origin,
            destination: service.ds_Destination,
            waypoints: waypoints,
            travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirections(results);
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
                        <h3>Veículo: <span>{service.ds_Veiculo}</span></h3>
                        <h3>Placa: <span>{service.cd_Placa}</span></h3>
                        <h3>Peso: <span>{service.vl_Peso} KG</span></h3>
                        <h3>Data de Saída: <span>{service.dt_Saida}</span></h3>
                        <h3>Data de Chegada: <span>{service.dt_Chegada ? service.dt_Chegada : 'Sem data'}</span></h3>
                        <h3>Status: <span>{service.st_Status}</span></h3>
                    </div>
                    
                    <div className='contact-form'>
                        
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
                    </form>}
                        <button className='service-button' onClick={handleVoltar}>Voltar</button>
                        {IsAuthorized([2000, 3000]) &&
                            <div className='map-container'>
                                <button className='service-button-map' onClick={calculateRoute}>Mostrar Rota</button>
                                <GoogleMap 
                                    center={center} 
                                    zoom={15}
                                    mapContainerClassName='map-render'
                                    options={{
                                        mapTypeControl: false,
                                    }}
                                >
                                    {directions && (
                                        <DirectionsRenderer directions={directions} />
                                    )}
                                </GoogleMap>
                            </div>
                        }
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default EditService;