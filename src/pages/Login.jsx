import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main className="auth">
      <div className="card">
        <div className="card-body p-4">
          <h1>FitTrainer</h1>
          <p>Registro e inicio de sesión demo. La arquitectura permite conectar autenticación real desde el backend.</p>
          <label className="form-label" htmlFor="email">Correo electrónico</label>
          <input id="email" className="form-control mb-2" placeholder="alex@fittrainer.app" />
          <label className="form-label" htmlFor="password">Contraseña</label>
          <input id="password" className="form-control mb-3" placeholder="••••••••" type="password" />
          <Link to="/" className="btn btn-orange w-100">Entrar / Registrarme</Link>
        </div>
      </div>
    </main>
  );
}
