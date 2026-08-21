import { Navigate, Outlet } from 'react-router-dom';
// Fingiremos que este hook nos dá os dados reais do Supabase
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute() {
    const { session, isLoading } = useAuth();

  // CENÁRIO 1: O sistema ainda está a carregar/verificar a sessão
 if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>; 
  // No futuro, trocamos esse texto por um Spinner de verdade!
}

  
  // CENÁRIO 2: O sistema terminou de carregar, mas a sessão é nula (utilizador não está logado)
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  // O "replace" é um truque de Sênior: ele apaga o histórico, assim a secretária 
  // não consegue clicar no botão "Voltar" do navegador para tentar burlar o login.



 // 3. Cenário de Sucesso (Acesso liberado!)
     return <Outlet />

}