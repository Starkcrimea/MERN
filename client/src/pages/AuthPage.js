import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/contexthook'
import { useMessage } from '../hooks/messagehook'
import { useHttp } from '../hooks/useHttp'


export const  AuthPage = isAuth => {
  const [form, setForm] = useState({
    email:'', password:''
  }) 
  const {loading, request ,error , clearError } = useHttp()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const formHandler = (event) =>{
    setForm({...form, [event.target.name]: event.target.value})
  }
  useEffect(()=>{
    message(error)
    clearError()

  },[error,message,clearError])
  const registerHandler = async  () =>{
    try{
        const data = await request('api/auth/register','POST',{...form})
        message(data.message)
    } catch(error){}
  }
  const authHandler = async  () =>{
    try{
        const data = await request('api/auth/login','POST',{...form})
        auth.login(data.token,data.userId)
        message(data.message)
    } catch(error){}
  }
    return(
<div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
    <div className="input-field">
      <input 
      className="yellow-input"  
      id="email" 
      type="text" 
      placeholder="Введите email"
      name = 'email'
      value={form.email}
      onChange={formHandler}/>
      <label className="active" htmlFor="first_name2">Email</label>
    </div>
    <div className="input-field">
      <input 
      className="yellow-input"
      id="first_name2" 
      type="password" 
      placeholder="Введите пароль"
      name = 'password'
      value={form.password}
      onChange={formHandler}/>
      <label className="active" htmlFor="first_name2">Password</label>
    </div>

          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={authHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
        )
    
    }