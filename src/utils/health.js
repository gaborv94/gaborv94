export const activityLevels = ['Sedentario', 'Ligero', 'Moderado', 'Activo', 'Muy activo'];
export const physicalGoals = ['Perder peso', 'Ganar masa muscular', 'Mantener peso', 'Mejorar resistencia'];

export function ageFromBirthdate(date) {
  if (!date) return 0;
  const today = new Date();
  const birth = new Date(date);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDelta = today.getMonth() - birth.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) age -= 1;
  return Math.max(0, age);
}

export function calculateBmi(weightKg, heightCm) {
  if (!weightKg || !heightCm) return 0;
  return Number((weightKg / (heightCm / 100) ** 2).toFixed(1));
}

export function classifyBmi(value) {
  if (value < 18.5) return 'Bajo peso';
  if (value < 25) return 'Normal';
  if (value < 30) return 'Sobrepeso';
  return 'Obesidad';
}

export function healthyWeightRange(heightCm) {
  const heightM = heightCm / 100;
  return {
    min: Number((18.5 * heightM ** 2).toFixed(1)),
    max: Number((24.9 * heightM ** 2).toFixed(1)),
    ideal: Number((22 * heightM ** 2).toFixed(1)),
  };
}

export function calculateCalories({ met, weightKg, minutes, intensity = 1, sex = 'Masculino' }) {
  const sexFactor = sex === 'Femenino' ? 0.95 : 1;
  return Number(((met * 3.5 * weightKg * minutes * intensity * sexFactor) / 200).toFixed(1));
}

export function getTrainingProfile(user, stats) {
  if (user.activityLevel === 'Muy activo' || stats.completedWorkouts >= 25 || stats.weeklyMinutes >= 180) {
    return 'Avanzado';
  }
  if (['Moderado', 'Activo'].includes(user.activityLevel) || stats.completedWorkouts >= 8 || stats.weeklyMinutes >= 90) {
    return 'Intermedio';
  }
  return 'Principiante';
}

export function getProgressionRecommendation({ user, stats, bmi }) {
  if (stats.streak >= 14) return 'Has mantenido una racha de 14 días. Excelente trabajo.';
  if (stats.completedWorkouts >= 8 && bmi < 30) return 'Estás listo para avanzar al nivel Intermedio.';
  if (bmi >= 30) return 'Reduce intensidad si hay fatiga y prioriza constancia, movilidad y recuperación.';
  if (user.goal === 'Perder peso') return 'Para alcanzar tu peso objetivo se recomienda completar 3 entrenamientos por semana.';
  return 'Mantén tu nivel actual y aumenta volumen gradualmente si completas la semana sin dolor.';
}

export function weeklyReport({ user, bodyLogs, workouts, level }) {
  const first = bodyLogs[0];
  const last = bodyLogs.at(-1);
  const calories = workouts.reduce((sum, item) => sum + item.calories, 0);
  const minutes = workouts.reduce((sum, item) => sum + item.duration, 0);
  const initialBmi = calculateBmi(first.weight, first.height);
  const currentBmi = calculateBmi(last.weight, last.height);
  return {
    initialWeight: first.weight,
    currentWeight: last.weight,
    weightChange: Number((last.weight - first.weight).toFixed(1)),
    bmiChange: Number((currentBmi - initialBmi).toFixed(1)),
    calories,
    minutes,
    completed: workouts.length,
    level,
    recommendation: getProgressionRecommendation({ user, stats: { completedWorkouts: workouts.length, streak: 2 }, bmi: currentBmi }),
  };
}
