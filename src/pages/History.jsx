import { useApp } from '../context/AppContext';

const achievements = [
  ['Primer entrenamiento', 1],
  ['5 entrenamientos', 5],
  ['10 entrenamientos', 10],
  ['25 entrenamientos', 25],
  ['50 entrenamientos', 50],
  ['100 entrenamientos', 100],
  ['1000 calorías quemadas', 1000],
  ['5000 calorías quemadas', 5000],
  ['7 días consecutivos', 7],
  ['30 días consecutivos', 30],
];

export default function History() {
  const { workouts, report, metrics, settings, setSettings } = useApp();
  return (
    <>
      <h1>Historial de entrenamientos</h1>
      {workouts.map((workout) => (
        <div className="card my-2" key={workout.id}>
          <div className="card-body d-flex flex-wrap justify-content-between gap-2">
            <b>{workout.date} · {workout.time}</b>
            <span>{workout.routine}</span>
            <span>{workout.duration} min</span>
            <span>{workout.calories} kcal</span>
            <span>{workout.exercises} ejercicios</span>
          </div>
        </div>
      ))}

      <div className="card mt-4">
        <div className="card-body">
          <h2>Informe semanal automático</h2>
          <div className="row g-3">
            <div className="col-md-3"><span className="text-secondary">Peso inicial</span><h4>{report.initialWeight} kg</h4></div>
            <div className="col-md-3"><span className="text-secondary">Peso actual</span><h4>{report.currentWeight} kg</h4></div>
            <div className="col-md-3"><span className="text-secondary">Cambio IMC</span><h4>{report.bmiChange}</h4></div>
            <div className="col-md-3"><span className="text-secondary">Nivel</span><h4>{report.level}</h4></div>
          </div>
          <p className="mt-3 mb-0">{report.recommendation}</p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h2>Logros</h2>
          {achievements.map(([label]) => <span className="pill" key={label}>🏆 {label}</span>)}
          <h2 className="mt-4">Recordatorios</h2>
          <p>Módulo preparado para futuras notificaciones de entrenamiento, recordatorios semanales y objetivos.</p>
          <label className="form-label" htmlFor="reminderTime">Hora de entrenamiento</label>
          <input id="reminderTime" className="form-control reminder-input" type="time" value={settings.reminderTime} onChange={(event) => setSettings({ ...settings, reminderTime: event.target.value })} />
          <small className="text-secondary d-block mt-2">Racha actual: {metrics.streak} días consecutivos.</small>
        </div>
      </div>
    </>
  );
}
