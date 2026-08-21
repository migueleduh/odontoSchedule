import { AppRouter } from "./routes/AppRouter"
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (
    <div>
      <AuthProvider>
          <AppRouter />
      </AuthProvider>
         
    </div>
  )
}

export default App
