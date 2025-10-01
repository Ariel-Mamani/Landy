import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// props para recibir los datos del arbol familiar
interface BarChartProps {
    familyData: Array<{
        name: string;
        genero: string;
    }>;
}

export const BarChart = ({ familyData }: BarChartProps) => {
    const groupByGender = (data: Array<{ genero: string }>) => {
        const genders = {
            'Hombre': 0,
            'Mujer': 0
        };

        data.forEach(person => {
            if (person.genero === 'Masculino') {
                genders['Hombre']++;
            } else if (person.genero === 'Femenino') {
                genders['Mujer']++;
            }
        });
        return genders;
    };

    const genderCounts = groupByGender(familyData);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // para ocultar completamente la leyenda
            },
            title: {
                display: true,
                text: 'Distribución de Géneros en tu Familia',
            },
        },
    };

    const data = {
        labels: Object.keys(genderCounts),

        datasets: [
            {
                label: 'Cantidad de Familiares',
                data: Object.values(genderCounts),
                backgroundColor: [
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 99, 132, 0.7)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ width: "400px", height: "300px", margin: "0 auto" }}>
            <Bar options={options} data={data} />
        </div>
    );
};