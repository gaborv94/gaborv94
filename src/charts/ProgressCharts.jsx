import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const colors = ['#ff8a00', '#4dabf7', '#51cf66', '#f06595'];

export function BodyChart({ bodyLogs }) {
  const labels = bodyLogs.map((item) => item.date);
  return (
    <Line
      data={{
        labels,
        datasets: ['waist', 'chest', 'arm', 'thigh'].map((key, index) => ({
          label: key,
          data: bodyLogs.map((item) => item[key]),
          borderColor: colors[index],
          tension: 0.35,
        })),
      }}
    />
  );
}

export function WorkoutChart({ workouts }) {
  return (
    <Bar
      data={{
        labels: workouts.map((item) => item.date),
        datasets: [
          { label: 'Calorías', data: workouts.map((item) => item.calories), backgroundColor: '#ff8a00' },
          { label: 'Minutos', data: workouts.map((item) => item.duration), backgroundColor: '#1c7ed6' },
        ],
      }}
    />
  );
}

export function WeightChart({ bodyLogs }) {
  return (
    <Line
      data={{
        labels: bodyLogs.map((item) => item.date),
        datasets: [{ label: 'Peso', data: bodyLogs.map((item) => item.weight), borderColor: '#ff8a00', tension: 0.35 }],
      }}
    />
  );
}
