import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

const EsquemaFormulari = Yup.object().shape({
    email: Yup.string().min(6,"Too Short!").max(1024, "To Long!").email("Invalid Email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  

});

class Login extends React.Component {

    render() {
        
        const login = (values) =>{
            console.log(values);
            let  usuario = {
               "email": values.email,
               "password": values.password
            }

            fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/login',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.data.token);
                localStorage.setItem("Token", JSON.stringify(data.data.token));
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Formik initialValues={{email: "", password: "" }}
                            validationSchema={EsquemaFormulari}
                            onSubmit={values => {
                                //console.log(values);
                                login(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <div>
                                    <div className="row mb-5">
                                        <div className="col-lg-12 text-center">
                                            <h1 className="mt-5">Login</h1>
                                        </div>
                                    </div>
                                    <Form>
                                        <div className="mb-3 row">
                                            <label htmlFor="email" className="col-sm-2 col-form-label">Correo electronico</label>
                                            <div className="col-sm-10">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="name@example.com"
                                                    className="form-control"
                                                />
                                                {errors.email && touched.email ? (
                                                    <div>{errors.email}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="password" className="col-sm-2 col-form-label">Contraseña</label>
                                            <div className="col-sm-10">
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    
                                                    className="form-control"
                                                />
                                                {errors.password && touched.password ? (
                                                    <div>{errors.password}</div>) : null}
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary mt-4 btn-block">Enviar</button>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;