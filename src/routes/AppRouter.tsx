import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import { AgendaPage } from '../pages/AgendaPage';


export function AppRouter(){
    return (
      <BrowserRouter>
        <Routes>
                {/* Rota Pública */}
                <Route path="/login" element={<LoginPage />} />

                {/* Rotas Protegidas (Passam pelo "middleware" ProtectedRoute) */}
                <Route element={<ProtectedRoute />}>
                <Route path="/agenda" element={<AgendaPage />} />
                {/* Futuramente: <Route path="/pacientes" element={<PacientesPage />} /> */}
                </Route>

                {/* Redirecionamento Padrão: qualquer rota desconhecida vai para /agenda */}
                <Route path="*" element={<Navigate to="/agenda" replace />} />
        </Routes>
     </BrowserRouter>
  );
}