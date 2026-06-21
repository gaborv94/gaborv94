import RoutineCard from '../components/RoutineCard';
import { routines } from '../data/routines';

export default function Routines() {
  return (
    <>
      <h1>Biblioteca de rutinas</h1>
      <p className="text-secondary">La rutina principal se recomienda a usuarios nuevos y la estructura permite agregar planes sin modificar la lógica del entrenamiento.</p>
      <div className="row g-3">
        {routines.map((routine) => <div className="col-md-6 col-xl-3" key={routine.id}><RoutineCard routine={routine} /></div>)}
      </div>
    </>
  );
}
