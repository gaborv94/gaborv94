import { BodyChart, WeightChart, WorkoutChart } from '../charts/ProgressCharts';
import { useApp } from '../context/AppContext';

export default function Stats() {
  const { bodyLogs, workouts } = useApp();
  return (
    <>
      <h1>Estadísticas</h1>
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card h-100"><div className="card-body"><h4>Mensual: evolución de peso</h4><WeightChart bodyLogs={bodyLogs} /></div></div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100"><div className="card-body"><h4>Semanal: calorías y tiempo</h4><WorkoutChart workouts={workouts} /></div></div>
        </div>
        <div className="col-12">
          <div className="card"><div className="card-body"><h4>Corporales: cintura, pecho, brazos y muslos</h4><BodyChart bodyLogs={bodyLogs} /></div></div>
        </div>
      </div>
    </>
  );
}
