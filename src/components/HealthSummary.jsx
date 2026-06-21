import { useApp } from '../context/AppContext';

export default function HealthSummary() {
  const { user, goals, metrics } = useApp();
  return (
    <div className="card h-100">
      <div className="card-body">
        <h4>Perfil de salud</h4>
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <span className="text-secondary">IMC actual</span>
            <div className="display-6 fw-bold">{metrics.bmi}</div>
            <span className="badge bg-info text-dark">{metrics.bmiStatus}</span>
          </div>
          <div className="col-md-3">
            <span className="text-secondary">Peso saludable</span>
            <p className="mb-1">{metrics.healthyRange.min} - {metrics.healthyRange.max} kg</p>
            <small>Ideal recomendado: {metrics.healthyRange.ideal} kg</small>
          </div>
          <div className="col-md-3">
            <span className="text-secondary">Objetivo</span>
            <p className="mb-1">Actual: {user.weight} kg</p>
            <small>Meta: {goals.targetWeight} kg</small>
          </div>
          <div className="col-md-3">
            <span className="text-secondary">Diferencia restante</span>
            <p className="mb-1">{Math.max(0, metrics.remaining)} kg</p>
            <div className="progress" aria-label="Progreso hacia peso objetivo">
              <div className="progress-bar bg-warning text-dark" style={{ width: `${metrics.progress}%` }}>{metrics.progress}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
