import { useAuth } from "../contexts/AuthContext";
import { use, useEffect, useState } from "react";
import type { agendamento } from "../types/agendamento";
import { supabase } from "../service/supabase";

export function AgendaPage() {
  //estados de logout
  const {signOut} = useAuth();
  const [error, setError] = useState("");

  //estados de busca de pacientes 
  const [appointments, setAppointments] = useState<agendamento[]>([])
  const [errorData, setErrorData] = useState(""); 
  const [isloading, setLoading ] = useState(true);




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

  useEffect(() => {
    //função de busca 
    const fetchAppointments = async () => {
      try{
        const { data, error: supabaseError } = await supabase.from('agendamento').select('*, paciente:paciente_fk ( nome ), dentista:dentista_fk ( nome )');
   
        if(supabaseError){
          setErrorData(supabaseError.message);
        }

        if(data){
          setAppointments(data);
          return;
        }

      }catch(error){
            if(error instanceof Error){
            setErrorData(error.message);
            return
            }

            else{
             setErrorData("Erro inesperado de conexão");
            }
      } finally{
          setLoading(false);        
      } 
    }

    //chamando a função 
    fetchAppointments()
  },[]);

  return(
    <div>
      {isloading && <p>Carregando agendamentos...</p>}
      {error && <p>{error}</p>}
      {errorData && <p>{errorData}</p>}

      <button type="button" onClick={handleLogOut}>log out</button>
      <ul>
        {appointments.map((item) => (
          <li key={item.id}>
            <div>
              <p>Paciente: {item.paciente.nome ?? "Não informado"}</p>
              <p>Procedimento: {item.procedimento} ({item.status})</p> 
              <p>Dentista: {item.dentista?.nome ?? "Não informado"}</p> 
              <p>
                  Data: {new Date(item.data_horario).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </p>
            </div><br/>
          </li>
        ))}
      </ul>
    </div>
    
    
  )
}