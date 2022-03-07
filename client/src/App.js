import { AuthPage } from "./pages/AuthPage"
import { useRoutes } from "./routes"
import {BrowserRouter} from 'react-router-dom'
import 'materialize-css'
import { AuthContext } from "./context/contexthook"
import { useAuth } from "./hooks/authhook"
import { NavBar } from "./components/Navbar"
const App = () =>{
  const {login, logout, token, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  // if(!ready){
  //   return <Loader/>
  // }
    return (   
      <AuthContext.Provider value={{login, logout, token, userId ,isAuthenticated}}>
    <BrowserRouter>
    { isAuthenticated && <NavBar />}
    <div className="container">
     {routes}
      </div>
      </BrowserRouter>
      </AuthContext.Provider>
      )
 
}

export default App