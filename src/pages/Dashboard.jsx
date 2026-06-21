import HealthSummary from '../components/HealthSummary';
import MetricCard from '../components/MetricCard';
import RoutineCard from '../components/RoutineCard';
import { useApp } from '../context/AppContext';
import { recommendedRoutine } from '../data/routines';

const metricIcons = ['⚖️', '🫀', '🔥', '📅', '✅', '⏱️', '⚡', '🎯'];

export default function Dashboard() {
  const { user, goals, metrics } = useApp();
  const cards = [
    ['Peso actual', `${user.weight} kg`, `Objetivo ${goals.targetWeight} kg`],
    ['IMC actual', metrics.bmi, metrics.bmiStatus],
    ['Calorías semana', metrics.caloriesWeek, 'kcal quemadas'],
    ['Calorías mes', metrics.caloriesMonth, 'kcal acumuladas'],
    ['Entrenamientos', metrics.completedWorkouts, 'completados'],
    ['Tiempo total', `${metrics.totalMinutes} min`, 'entrenado'],
    ['Racha', `${metrics.streak} días`, 'consecutivos'],
    ['Próximo entrenamiento', 'Estrés Compuesto', 'recomendado'],
  ];

  return (
    <>
      <section className="hero card mb-4">
        <div className="card-body p-4 p-lg-5">
          <span className="eyebrow">FitTrainer Premium</span>
          <h1>Tu entrenador personal digital</h1>
          <p className="lead col-lg-8">Planifica, entrena y mide tu progreso con recomendaciones automáticas para perder grasa, ganar músculo y crear hábitos sostenibles.</p>
          <span className="badge bg-warning text-dark me-2">Nivel actual: {metrics.level}</span>
          <span className="badge bg-primary">Objetivo semanal: {goals.workoutsPerWeek} entrenamientos</span>
        </div>
      </section>

      <div className="row g-3 mb-4">
        {cards.map(([title, value, subtitle], index) => (
          <div className="col-6 col-lg-3" key={title}>
            <MetricCard title={title} value={value} subtitle={subtitle} icon={metricIcons[index]} />
          </div>
        ))}
      </div>

      <HealthSummary />
      <div className="alert alert-dark border-warning mt-4" role="status">{metrics.recommendation}</div>
      <h2 className="mt-4">Rutina Recomendada</h2>
      <RoutineCard routine={recommendedRoutine} />
    </>
  );
}
