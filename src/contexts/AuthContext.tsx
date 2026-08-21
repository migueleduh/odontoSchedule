import { createContext, useEffect, useState, type ReactNode, useContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../service/supabase';

// 1. O Contrato: o que quem usar o useAuth() vai receber
interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

// 2. Criamos o Contexto vazio com base no contrato
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. O Componente Provedor (A Torre de Transmissão)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);

useEffect(() => {
    // 1. Busca a sessão salva no navegador ao abrir o app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false); // Terminou a checagem inicial, libera a tela
    });

    // 2. Cria o ouvinte em tempo real para login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // 3. Função de limpeza (roda se o componente for destruído)
    return () => subscription.unsubscribe();
  }, []); // Array vazio: executa apenas UMA vez na montagem inicial!

  // Função para deslogar
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Por enquanto retornamos o canal transmitindo os valores
  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

  // 4. O Hook Customizado (A Antena)
export function useAuth() {
  const context = useContext(AuthContext);

  // Trava de segurança para evitar bugs silenciosos
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }

  return context;
}