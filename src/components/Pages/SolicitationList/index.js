import './index.scss';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SolicitationList = () => {

    const [solicitationList, setSolicitationList] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const getSolicitations = async () => {
        await axiosPrivate.get('/solicitation/list')
        .then(res => {
            setSolicitationList(res.data['data']);
        })
        .catch(err => {
            alert('Erro ao buscar solicitações');
        });
        
    }

    useEffect(() => {
        getSolicitations();
      }, []);

    const deleteSolicitation = async (id) => {
        await axiosPrivate.delete(`/solicitation/delete/${id}`);
        getSolicitations();
    }

    return (
        <>
            <div>
                <div className='text-zone-people'>
                    <h1>
                        Solicitações
                    </h1>

                    { solicitationList.length > 0 &&
                    <table className='person-list'>
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
                                        <td className='action-buttons'>
                                            <Link className='update-button' to={"/solicitation/" + item.id_Solicitacao} >
                                                 <FontAwesomeIcon icon={faMagnifyingGlass} color='#fff' />
                                            </Link>
                                            <button className='update-button'  onClick={() => deleteSolicitation(item.id_Solicitacao)}><FontAwesomeIcon icon={faTrash} color='#d11a2a' /></button>
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

export default SolicitationList;