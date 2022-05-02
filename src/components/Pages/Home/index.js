import './index.scss';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { LineChart, Tooltip, CartesianGrid, XAxis, Line } from 'recharts';
import IsAuthorized from '../../IsAuthorized';

const Home = () => {

    const { auth } = useAuth();
    const prediction = 50;
    const data = [
        {
            date: '2022-04-18',
            Solicitações: 30,
        },
        {
            date: '2022-04-19',
            Solicitações: 39
        },
        {
            date: '2022-04-20',
            Solicitações: 35
        },
        {
            date: '2022-04-21',
            Solicitações: 49
        },
        {
            date: '2022-04-22',
            Solicitações: 25
        },
        {
            date: '2022-04-23',
            Solicitações: 30
        },
        {
            date: '2022-04-24',
            Solicitações: 50
        },
    ];

    if (IsAuthorized([2000, 3000])) {
        return (
        
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                    <span>Olá, {auth?.logged_user?.ds_Pessoa}</span>
                    <br />
                    </h1>
                    <h2>De acordo com seu histórico de trabalho, </h2>
                    <h2>é previsto que hoje sua empresa terá em torno de</h2>
                    <div className='inner-text'>
                        <span className='prediction-text'>{prediction} solicitações</span>
                        <h2>de coleta</h2>
                    </div>
                    <Link to='/solicitation' className='flat-button'>CLIQUE PARA VER AS SOLICITAÇÕES</Link>
                </div>
                <div className='chart-zone'>
                    <span className='text-animate'>Últimos 7 dias do seu negócio</span>
                    <LineChart
                        width={800}
                        height={200}
                        data={data}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                        fontSize={18}
                        >
                        <XAxis 
                            style={
                                {
                                    fontSize: '13px',
                                    color: '#000'
                                }
                            } 
                            dataKey="date" 
                        />
                        <Tooltip 
                            contentStyle={
                                {
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    border: 'none',
                                    fontSize: '18px'
                                }
                            } 
                        />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="Solicitações" stroke="#ffd700" strokeWidth={3} yAxisId={0} />
                    </LineChart>
                    </div>
            </div>
        );
    } else {
        return (
        
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                    <span>Olá, {auth?.logged_user?.ds_Pessoa}</span>
                    <br />
                    </h1>
                    <h2>Como vai hoje?</h2>
                    <h2>Estamos prontos para te atender, é só fazer uma nova solicitação.</h2>
                    <Link to='/new-service' className='flat-button'>CLIQUE PARA FAZER UMA SOLICITAÇÃO</Link>
                </div>
            </div>
        );
    }

    
}

export default Home;