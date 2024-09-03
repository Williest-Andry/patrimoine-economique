import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { Line } from 'react-chartjs-2';
import './test.css';

const LineChart = () => {
    const data = {
        labels: [1, 2, 3, 4, 5],
        datasets: [
            {
                label: 'Courbe de la valeur du patrimoine',
                data: ["non", "oui", "non", "oui", "non"],
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permet de définir les dimensions en pixels
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X Axis Title'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Axis Title'
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

export default function App() {
    return (
        <>
            <LineChart/>
        </>
    )
}