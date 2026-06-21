import { useApp } from '../context/AppContext';

const goalFields = [
  ['targetWeight', 'Peso objetivo', 'kg'],
  ['weeklyCalories', 'Calorías semanales', 'kcal'],
  ['workoutsPerWeek', 'Entrenamientos por semana', 'sesiones'],
  ['weeklyMinutes', 'Tiempo de entrenamiento semanal', 'min'],
];

export default function Goals() {
  const { goals, setGoals, metrics } = useApp();
  const caloriesPercent = Math.min(100, Math.round((metrics.caloriesWeek / goals.weeklyCalories) * 100));
  const workoutsPercent = Math.min(100, Math.round((metrics.completedWorkouts / goals.workoutsPerWeek) * 100));
  const minutesPercent = Math.min(100, Math.round((metrics.weeklyMinutes / goals.weeklyMinutes) * 100));

  return (
    <>
      <h1>Sistema de metas</h1>
      <div className="card mb-4">
        <div className="card-body row g-3">
          {goalFields.map(([key, label, unit]) => (
            <div className="col-md-6" key={key}>
              <label className="form-label" htmlFor={key}>{label}</label>
              <div className="input-group">
                <input id={key} className="form-control" type="number" value={goals[key]} onChange={(event) => setGoals({ ...goals, [key]: Number(event.target.value) })} />
                <span className="input-group-text">{unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {[['Calorías', caloriesPercent], ['Entrenamientos', workoutsPercent], ['Minutos', minutesPercent]].map(([label, percent]) => (
        <div className="card my-2" key={label}>
          <div className="card-body">
            <div className="d-flex justify-content-between"><b>{label}</b><span>{percent}%</span></div>
            <div className="progress"><div className="progress-bar bg-warning text-dark" style={{ width: `${percent}%` }} /></div>
          </div>
        </div>
      ))}
    </>
  );
}
