import './index.scss';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className='unauthorized'>
            <h1>Unauthorized</h1>
            <br />
            <p>Você não tem acesso à página solicitada. :/</p>
            <div>
                <button className='btn' onClick={goBack}>Voltar</button>
            </div>
        </section>
    )
}

export default Unauthorized;