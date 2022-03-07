import {Routes, Route, Navigate} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { LinkPage } from './pages/LinkPage'
import {CreatePage} from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'

export const useRoutes = isAuth  =>{
    if(isAuth){
        return( 
        <Routes>
            <Route path='links' element={<LinkPage />} />
            <Route path='create' element={<CreatePage />} />
            <Route path='detail/:id' element={<DetailPage />} />
            <Route path="/" element={<Navigate to="create" />}
    />
        </Routes>
        
        )
    }
    return(
    <Routes>
        <Route path='/' element = {<AuthPage/>}/>
    </Routes> 
    )
}


