export const activityLevels=['Sedentario','Ligero','Moderado','Activo','Muy activo'];
export const goals=['Perder peso','Ganar masa muscular','Mantener peso','Mejorar resistencia'];
export function ageFromBirthdate(date){if(!date)return 0;const diff=Date.now()-new Date(date).getTime();return Math.max(0,Math.floor(diff/31557600000));}
export function bmi(weight,heightCm){return heightCm? +(weight/((heightCm/100)**2)).toFixed(1):0;}
export function bmiStatus(v){if(v<18.5)return 'Bajo peso'; if(v<25)return 'Normal'; if(v<30)return 'Sobrepeso'; return 'Obesidad';}
export function healthyWeightRange(heightCm){const h=heightCm/100;const min=+(18.5*h*h).toFixed(1);const max=+(24.9*h*h).toFixed(1);const ideal=+(22*h*h).toFixed(1);return {min,max,ideal};}
export function caloriesBurned({met,weightKg,minutes,intensity=1,sex='Masculino'}){const sexFactor=sex==='Femenino'?0.95:1;return +((met*3.5*weightKg/200)*minutes*intensity*sexFactor).toFixed(1);}
export function trainingLevel(user,stats){if(user.activityLevel==='Muy activo'||stats.completed>=25)return 'Avanzado'; if(['Moderado','Activo'].includes(user.activityLevel)||stats.completed>=8)return 'Intermedio'; return 'Principiante';}
export function progressionAdvice(user,stats,currentBmi){if(stats.streak>=14)return 'Has mantenido una racha de 14 días. Excelente trabajo.'; if(stats.completed>=8&&currentBmi<30)return 'Estás listo para avanzar al nivel Intermedio.'; if(currentBmi>=30)return 'Mantén intensidad controlada y prioriza consistencia semanal.'; return 'Para alcanzar tu peso objetivo se recomienda completar 3 entrenamientos por semana.';}
