export const mediaLibrary = {
  pushups: { mp4: '/assets/videos/pushups.mp4', gif: '/assets/gifs/pushups.gif', image: '/assets/images/pushups.svg' },
  squats: { mp4: '/assets/videos/squats.mp4', gif: '/assets/gifs/squats.gif', image: '/assets/images/squats.svg' },
  plank: { mp4: '/assets/videos/plank.mp4', gif: '/assets/gifs/plank.gif', image: '/assets/images/plank.svg' },
  burpees: { mp4: '/assets/videos/burpees.mp4', gif: '/assets/gifs/burpees.gif', image: '/assets/images/burpees.svg' },
  cardio: { mp4: '/assets/videos/cardio.mp4', gif: '/assets/gifs/cardio.gif', image: '/assets/images/cardio.svg' },
};

const exercise = ({ id, name, description, duration, met = 5, reps = '', mediaKey = 'cardio', intensity = 'moderada' }) => ({
  id,
  name,
  description,
  duration,
  met,
  reps,
  intensity,
  media: mediaLibrary[mediaKey],
});

export const routines = [
  {
    id: 'compound-stress',
    name: 'Entrenamiento de Estrés Compuesto',
    tag: 'Rutina Recomendada',
    duration: '25 a 30 minutos',
    objective: ['Fuerza', 'Resistencia', 'Quema de grasa'],
    level: 'Principiante',
    description: 'Rutina base para usuarios nuevos con progresión segura, fuerza funcional y cardio controlado.',
    blocks: [
      {
        name: 'Calentamiento',
        items: [exercise({ id: 'warm-walk', name: 'Caminar o trotar ligero', description: 'Activa articulaciones y eleva temperatura corporal.', duration: 300, met: 3.5, reps: '5 minutos', mediaKey: 'cardio' })],
      },
      {
        name: 'Bloque de fuerza y resistencia',
        items: [
          exercise({ id: 'pushups', name: 'Flexiones', description: 'Al fallo técnico con postura controlada.', duration: 45, met: 8, reps: 'Al fallo técnico', mediaKey: 'pushups' }),
          exercise({ id: 'squats', name: 'Sentadillas', description: 'Baja con espalda neutra y rodillas alineadas.', duration: 60, met: 5, reps: '15 repeticiones', mediaKey: 'squats' }),
          exercise({ id: 'active-walk-30', name: 'Caminata activa', description: 'Recuperación dinámica sin detenerte.', duration: 30, met: 3.5, reps: '30 segundos', mediaKey: 'cardio' }),
          exercise({ id: 'pushups-2', name: 'Flexiones segunda serie', description: 'Segunda serie al fallo técnico.', duration: 45, met: 8, reps: 'Al fallo técnico', mediaKey: 'pushups' }),
          exercise({ id: 'plank', name: 'Plancha', description: 'Mantén abdomen firme y respiración constante.', duration: 20, met: 4, reps: '20 segundos', mediaKey: 'plank' }),
          exercise({ id: 'lunges', name: 'Zancadas', description: 'Paso amplio, torso estable y control de rodilla.', duration: 60, met: 6, reps: '10 por pierna', mediaKey: 'squats' }),
          exercise({ id: 'mountain-climbers', name: 'Mountain Climbers', description: 'Rodillas al pecho con ritmo constante.', duration: 30, met: 8, reps: '30 segundos', mediaKey: 'burpees' }),
          exercise({ id: 'active-walk-60', name: 'Caminata activa', description: 'Recupera manteniendo movimiento.', duration: 60, met: 3.5, reps: '60 segundos', mediaKey: 'cardio' }),
        ],
      },
      {
        name: 'Mentalidad de guerrero',
        items: [
          exercise({ id: 'burpees', name: 'Burpees', description: 'Cinco repeticiones potentes; alternativa Jumping Jacks 45 segundos.', duration: 45, met: 10, reps: '5 repeticiones', mediaKey: 'burpees', intensity: 'alta' }),
          exercise({ id: 'bear-crawl', name: 'Bear Crawl', description: 'Avanza y retrocede con control de core.', duration: 45, met: 8, reps: '10 pasos adelante y 10 atrás', mediaKey: 'plank', intensity: 'alta' }),
          exercise({ id: 'wall-sit', name: 'Wall Sit', description: 'Espalda contra la pared y piernas a 90 grados.', duration: 45, met: 5, reps: '45 segundos', mediaKey: 'squats' }),
        ],
      },
      {
        name: 'Enfriamiento',
        items: [exercise({ id: 'cooldown', name: 'Caminata', description: 'Reduce pulsaciones y respira profundo.', duration: 180, met: 2.5, reps: '3 minutos', mediaKey: 'cardio', intensity: 'baja' })],
      },
    ],
  },
  { id: 'fat-burn-express', name: 'Quema Grasa Express', tag: 'Futura rutina', duration: '18 minutos', objective: ['Quema de grasa'], level: 'Intermedio', description: 'Circuito corto de alta densidad para días con poco tiempo.', blocks: [] },
  { id: 'total-strength', name: 'Fuerza Total', tag: 'Futura rutina', duration: '35 minutos', objective: ['Fuerza', 'Masa muscular'], level: 'Intermedio', description: 'Progresión de fuerza de cuerpo completo.', blocks: [] },
  { id: 'advanced-hiit', name: 'HIIT Avanzado', tag: 'Futura rutina', duration: '22 minutos', objective: ['Cardio', 'Resistencia'], level: 'Avanzado', description: 'Intervalos demandantes para usuarios con experiencia.', blocks: [] },
];

export const recommendedRoutine = routines[0];
