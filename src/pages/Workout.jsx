import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { routines } from '../data/routines';
import { calculateCalories } from '../utils/health';

export default function Workout() {
  const { id } = useParams();
  const routine = routines.find((item) => item.id === id) || routines[0];
  const exercises = useMemo(() => routine.blocks.flatMap((block) => block.items.map((item) => ({ ...item, block: block.name }))), [routine]);
  const { user, settings, setSettings, addWorkout } = useApp();
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const current = exercises[index];
  const progress = exercises.length ? ((index + 1) / exercises.length) * 100 : 0;
  const exerciseCalories = current ? calculateCalories({ met: current.met, weightKg: user.weight, minutes: current.duration / 60, sex: user.sex }) : 0;
  const sessionCalories = exercises.reduce((sum, exercise) => sum + calculateCalories({ met: exercise.met, weightKg: user.weight, minutes: exercise.duration / 60, sex: user.sex }), 0);

  const finish = () => {
    addWorkout({
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      routine: routine.name,
      duration: Math.round(exercises.reduce((sum, exercise) => sum + exercise.duration, 0) / 60),
      calories: Math.round(sessionCalories),
      exercises: exercises.length,
    });
    setRunning(false);
  };

  if (!current) {
    return <div className="card"><div className="card-body"><h1>{routine.name}</h1><p>{routine.description}</p><p>Esta rutina está preparada como plantilla para futura expansión.</p></div></div>;
  }

  return (
    <>
      <h1>{routine.name}</h1>
      <div className="card workout">
        <div className="card-body">
          <span className="badge bg-primary">{current.block}</span>
          <h2 className="mt-2">{current.name}</h2>
          <p>{current.description}</p>
          <div className="media-placeholder mb-3">
            <b>Video/GIF/Imagen demostrativa</b>
            <small>{current.media.mp4}</small>
            <small>{current.media.gif}</small>
            <small>{current.media.image}</small>
          </div>
          <div className="display-3 timer" aria-live="polite">{current.duration}s</div>
          <p>Objetivo: {current.reps}</p>
          <div className="progress mb-3" aria-label="Progreso del entrenamiento">
            <div className="progress-bar bg-warning text-dark" style={{ width: `${progress}%` }}>{Math.round(progress)}%</div>
          </div>
          <p>Calorías del ejercicio actual: {exerciseCalories} kcal · Calorías de la sesión: {Math.round(sessionCalories)} kcal</p>
          <p>Siguiente ejercicio: {exercises[index + 1]?.name || 'Finalizar entrenamiento'}</p>
          <div className="d-flex flex-wrap gap-2">
            <button className="btn btn-orange" onClick={() => setRunning(true)}>Iniciar</button>
            <button className="btn btn-outline-light" onClick={() => setRunning(false)}>Pausar</button>
            <button className="btn btn-outline-light" onClick={() => setRunning(true)}>Continuar</button>
            <button className="btn btn-outline-warning" onClick={() => setIndex((currentIndex) => Math.min(currentIndex + 1, exercises.length - 1))}>Siguiente ejercicio</button>
            <button className="btn btn-success" onClick={finish}>Finalizar entrenamiento</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setSettings({ ...settings, sound: !settings.sound })}>Sonidos {settings.sound ? 'ON' : 'OFF'}</button>
          </div>
          {running && <small className="text-success d-block mt-3">Cronómetro activo. El módulo contempla sonido de inicio, finalización y aviso cuando falten 5 segundos.</small>}
        </div>
      </div>
    </>
  );
}
