import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import History from './pages/History';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Routines from './pages/Routines';
import Stats from './pages/Stats';
import Workout from './pages/Workout';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/workout/:id" element={<Workout />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
