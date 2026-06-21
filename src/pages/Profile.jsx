import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { activityLevels, physicalGoals } from '../utils/health';

const fields = [
  ['firstName', 'Nombre', 'text'],
  ['lastName', 'Apellidos', 'text'],
  ['email', 'Correo electrónico', 'email'],
  ['password', 'Contraseña', 'password'],
  ['sex', 'Sexo', 'text'],
  ['birthdate', 'Fecha de nacimiento', 'date'],
  ['weight', 'Peso actual (kg)', 'number'],
  ['height', 'Talla (cm)', 'number'],
];

export default function Profile() {
  const { user, setUser, metrics, bodyLogs, addBodyLog } = useApp();
  const [bodyForm, setBodyForm] = useState({ waist: 97, hip: 102, chest: 105, arm: 35, thigh: 60, notes: '' });
  const updateUser = (key, value) => setUser({ ...user, [key]: ['weight', 'height'].includes(key) ? Number(value) : value });

  const registerBodyLog = (event) => {
    event.preventDefault();
    addBodyLog({ date: new Date().toISOString().slice(0, 10), weight: user.weight, height: user.height, ...bodyForm });
  };

  return (
    <>
      <h1>Perfil de usuario</h1>
      <div className="card mb-4">
        <form className="card-body row g-3">
          {fields.map(([key, label, type]) => (
            <div className="col-md-6" key={key}>
              <label className="form-label" htmlFor={key}>{label}</label>
              <input id={key} className="form-control" value={user[key]} type={type} onChange={(event) => updateUser(key, event.target.value)} />
            </div>
          ))}
          <div className="col-md-6">
            <label className="form-label" htmlFor="activityLevel">Nivel de actividad física</label>
            <select id="activityLevel" className="form-select" value={user.activityLevel} onChange={(event) => updateUser('activityLevel', event.target.value)}>
              {activityLevels.map((level) => <option key={level}>{level}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="goal">Objetivo físico</label>
            <select id="goal" className="form-select" value={user.goal} onChange={(event) => updateUser('goal', event.target.value)}>
              {physicalGoals.map((goal) => <option key={goal}>{goal}</option>)}
            </select>
          </div>
          <p className="mb-0">Edad calculada automáticamente: <b>{metrics.age}</b></p>
        </form>
      </div>

      <div className="card mb-4">
        <form className="card-body row g-3" onSubmit={registerBodyLog}>
          <h2>Registro corporal periódico</h2>
          {['waist', 'hip', 'chest', 'arm', 'thigh'].map((key) => (
            <div className="col-md" key={key}>
              <label className="form-label" htmlFor={key}>{key}</label>
              <input id={key} className="form-control" type="number" value={bodyForm[key]} onChange={(event) => setBodyForm({ ...bodyForm, [key]: Number(event.target.value) })} />
            </div>
          ))}
          <div className="col-12">
            <label className="form-label" htmlFor="notes">Observaciones</label>
            <textarea id="notes" className="form-control" value={bodyForm.notes} onChange={(event) => setBodyForm({ ...bodyForm, notes: event.target.value })} />
          </div>
          <div className="col-12"><button className="btn btn-orange">Guardar registro corporal</button></div>
        </form>
      </div>

      <h2>Histórico corporal</h2>
      {bodyLogs.map((log) => (
        <div className="card my-2" key={log.id}>
          <div className="card-body">{log.date}: {log.weight} kg · cintura {log.waist} · cadera {log.hip} · pecho {log.chest} · brazo {log.arm} · muslo {log.thigh}. {log.notes}</div>
        </div>
      ))}
    </>
  );
}
