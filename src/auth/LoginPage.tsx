import { useState} from 'react';

// Aqui importamos aquele cliente que você criou!

import { supabase } from '../service/supabase.ts';



export function LoginPage() {

  // 1. Nossos estados

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');



  // 2. Nossa função de envio

 

  const handleLogin = async (e: React.SubmitEvent) => {

    // 1. Impedimos o navegador de recarregar a página

    e.preventDefault();



    // 2. Validação simples antes de gastar rede

    if (!email || !password) {

      setError("Por favor, preencha todos os campos.");

      return;

    }



    // 3. Ativamos o estado de carregando e limpamos erros antigos

    setLoading(true);

    setError("");



    try {

      // 4. Chamamos o Supabase com "await" para esperar a resposta

      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({

        email,

        password,

      });



      // 5. Verificamos se o Supabase retornou algum erro de autenticação

      if (supabaseError) {

        setError(supabaseError.message);

      } else {

        console.log("Login realizado com sucesso!", data);

        // Aqui futuramente faremos o redirecionamento para a Agenda

      }

    } catch (err) {

      // O catch só será executado se houver uma falha catastrófica (ex: queda total de internet)

      setError("Erro de conexão ao tentar fazer login." + err);

    } finally {

      // 6. O bloco finally sempre roda, independente se deu certo ou errado.

      // Desativamos o loading para liberar o formulário novamente.

      setLoading(false);
      

    }

  };

   



  // 3. O nosso visual (Onde entrará o Tailwind)

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100">

       <form onSubmit={handleLogin}>

            { error && <p>{error}</p> } 
      
            {/* 2. Como amarramos o valor do input à variável 'email' e atualizamos ao digitar? */}
            <input className="border" type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
            />

            <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} 
            />

            {/* 3. Como passamos a nossa variável de estado para  desabilitar o botão? */}
            <button type="submit" disabled={loading}>
                Entrar
            </button>

      </form>
    </div>

  );

}