import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export function AgendaPage() {
  //estados de logout
  const {signOut} = useAuth();
  const [error, setError] = useState("");

  //estados de busca de pacientes 
  const [appointments, setAppointments] = useState("");
  const [error, setError] = useState(""); 
  const [isloading, setLoading ] = useState(false);


  

  const  handleLogOut = async () => {
      try {

        await signOut(); 
        
      }catch (errorLogout) {
        if (errorLogout instanceof Error) {
          setError(errorLogout.message);
        } else {
          setError('Erro ao tentar sair da conta.');
        }
      }
  } 


  return(
    <div>
      <h1>Bem-vindo à Agenda do Consultório! (Rota Protegida)</h1>
      {error && <p>{error}</p>}
      <button type="button" onClick={handleLogOut}>log out</button>
    </div> 
    
  )

}
