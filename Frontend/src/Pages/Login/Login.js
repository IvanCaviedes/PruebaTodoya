import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginAction from '../../redux/actions/LoginAction'
import RegisterAction from '../../redux/actions/RegisterAction'
import './Login.css'

function Login() {
    const dispatch = useDispatch();
    const [isregister, setisregister] = useState(false)
    const { payload, error, loading } = useSelector(e => e.AuthReducer)

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (isregister) {
            dispatch(RegisterAction(data))
        }else{
            dispatch(LoginAction(data))
        }
    };

    const onError = (error) => {
        console.log(error)
    };

    if (payload) {
        return (
            <Redirect to={"/carpetas"} />
        )
    }
    if (loading) {
        return (
            <div className="vh-100 row justify-content-center align-items-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <div className="vh-100 row justify-content-center align-items-center">
            {
                error &&
                <div class="alert alert-danger col-12 text-center text-uppercase" role="alert">
                    {error.data.message}
                </div>
            }
            <div className='login col-auto text-center col-md-6 col-12 row'>
                <div className="col-md-12 col-sm-12 col-12 col-lg-6" >
                    <img className='row img-fluid pt-4' src="https://multimedia-todoya-dev.s3.amazonaws.com/1/storage/site/site_logo.png" alt="" />
                </div>
                <div className="col-md-12 col-12 col-lg-6">
                    <form className='pt-5' onSubmit={handleSubmit(onSubmit, onError)}>
                        <h1 className="h3 mb-3 fw-normal">{isregister ? 'Registrar' : 'Iniciar sesion'}</h1>
                        <div className="my-3">
                            <input {...register("email", { required: true })} type="email" className="form-control" id="floatingInput" placeholder="correo@prueba.com" />
                        </div>
                        <div class="my-3">
                            <input {...register("password", { required: true })} type="password" className="form-control" id="floatingPassword" placeholder="Contraseña" />
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">{isregister ? 'Registrar' : 'Iniciar sesion'}</button>
                        <p>Si no tienes cuenta registrate</p>
                        <button className="w-100 btn btn-lg btn-info" onClick={()=>setisregister(!isregister)}>{isregister ? 'Iniciar sesion' : 'Registrar'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
