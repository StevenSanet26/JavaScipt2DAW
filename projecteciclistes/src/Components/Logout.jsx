import React from "react";
import { Formik, Form, Field } from "formik";
/*
const EsquemaFormulari = Yup.object().shape({
    email: Yup.string().min(6,"Too Short!").max(1024, "To Long!").email("Invalid Email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  

});*/

class Logout extends React.Component {

    render() {


        const cerrar = ()=>{
            localStorage.removeItem("Token");
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <h1 className="mt-5">Logout</h1>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-lg-12 ">
                                    <h3 className="mt-5">Quieres salir de tu perfil de usuario?</h3>
                                    <button type="button" className="btn btn-primary mt-4 btn-block" onClick={cerrar} >Salir</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Logout;