import { Link } from 'react-router-dom';

export default function RoutineCard({ routine }) {
  const exerciseCount = routine.blocks.reduce((sum, block) => sum + block.items.length, 0);
  return (
    <article className="card routine-card h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <span className="badge bg-warning text-dark">{routine.tag}</span>
          <span className="badge bg-dark border">{routine.level}</span>
        </div>
        <h4 className="mt-3">{routine.name}</h4>
        <p className="text-secondary flex-grow-1">{routine.description}</p>
        <p className="mb-1"><b>Duración:</b> {routine.duration}</p>
        <p className="mb-2"><b>Ejercicios:</b> {exerciseCount || 'Próximamente'}</p>
        <div className="mb-3">{routine.objective.map((objective) => <span className="pill" key={objective}>{objective}</span>)}</div>
        <Link className="btn btn-orange mt-auto" to={`/workout/${routine.id}`}>Entrenar</Link>
      </div>
    </article>
  );
}
