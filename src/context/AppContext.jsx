import { createContext, useContext, useMemo } from 'react';
import { recommendedRoutine } from '../data/routines';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  ageFromBirthdate,
  calculateBmi,
  classifyBmi,
  getProgressionRecommendation,
  getTrainingProfile,
  healthyWeightRange,
  weeklyReport,
} from '../utils/health';

const AppContext = createContext(null);

const defaultUser = {
  firstName: 'Alex',
  lastName: 'García',
  email: 'alex@fittrainer.app',
  password: 'demo1234',
  sex: 'Masculino',
  birthdate: '1992-04-12',
  weight: 90,
  height: 178,
  activityLevel: 'Ligero',
  goal: 'Perder peso',
};

const defaultBodyLogs = [
  { id: 1, date: '2026-06-01', weight: 92, height: 178, waist: 101, hip: 105, chest: 104, arm: 34, thigh: 59, notes: 'Inicio del plan' },
  { id: 2, date: '2026-06-08', weight: 91.2, height: 178, waist: 99, hip: 104, chest: 104, arm: 34.5, thigh: 59.5, notes: 'Más energía' },
  { id: 3, date: '2026-06-14', weight: 90, height: 178, waist: 98, hip: 103, chest: 105, arm: 35, thigh: 60, notes: 'Mejor recuperación' },
];

const defaultWorkouts = [
  { id: 1, date: '2026-06-18', time: '07:30', routine: 'Entrenamiento de Estrés Compuesto', duration: 28, calories: 245, exercises: 12 },
  { id: 2, date: '2026-06-20', time: '07:15', routine: 'Entrenamiento de Estrés Compuesto', duration: 30, calories: 261, exercises: 12 },
];

const defaultGoals = {
  targetWeight: 75,
  weeklyCalories: 900,
  workoutsPerWeek: 3,
  weeklyMinutes: 90,
};

export function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage('fittrainer.user', defaultUser);
  const [bodyLogs, setBodyLogs] = useLocalStorage('fittrainer.bodyLogs', defaultBodyLogs);
  const [workouts, setWorkouts] = useLocalStorage('fittrainer.workouts', defaultWorkouts);
  const [goals, setGoals] = useLocalStorage('fittrainer.goals', defaultGoals);
  const [settings, setSettings] = useLocalStorage('fittrainer.settings', { sound: true, reminderTime: '07:00' });

  const metrics = useMemo(() => {
    const currentBmi = calculateBmi(user.weight, user.height);
    const range = healthyWeightRange(user.height);
    const caloriesWeek = workouts.reduce((sum, workout) => sum + workout.calories, 0);
    const weeklyMinutes = workouts.reduce((sum, workout) => sum + workout.duration, 0);
    const completedWorkouts = workouts.length;
    const startWeight = bodyLogs[0]?.weight || user.weight;
    const remaining = Number((user.weight - goals.targetWeight).toFixed(1));
    const totalTargetChange = Math.max(1, Math.abs(startWeight - goals.targetWeight));
    const completedChange = Math.abs(startWeight - user.weight);
    const progress = Math.min(100, Math.round((completedChange / totalTargetChange) * 100));
    const level = getTrainingProfile(user, { completedWorkouts, weeklyMinutes });
    const stats = { completedWorkouts, weeklyMinutes, streak: 2 };

    return {
      age: ageFromBirthdate(user.birthdate),
      bmi: currentBmi,
      bmiStatus: classifyBmi(currentBmi),
      healthyRange: range,
      remaining,
      progress,
      caloriesWeek,
      caloriesMonth: caloriesWeek,
      completedWorkouts,
      weeklyMinutes,
      totalMinutes: weeklyMinutes,
      streak: 2,
      level,
      nextWorkout: recommendedRoutine.name,
      recommendation: getProgressionRecommendation({ user, stats, bmi: currentBmi }),
    };
  }, [bodyLogs, goals.targetWeight, user, workouts]);

  const report = useMemo(
    () => weeklyReport({ user, bodyLogs, workouts, level: metrics.level }),
    [bodyLogs, metrics.level, user, workouts],
  );

  const addWorkout = (workout) => setWorkouts((current) => [...current, { id: crypto.randomUUID(), ...workout }]);
  const addBodyLog = (bodyLog) => setBodyLogs((current) => [...current, { id: crypto.randomUUID(), ...bodyLog }]);

  return (
    <AppContext.Provider value={{ user, setUser, bodyLogs, addBodyLog, workouts, addWorkout, goals, setGoals, settings, setSettings, metrics, report }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
