import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';

const EsquemaFormulari = Yup.object().shape({
    name: Yup.string().min(6,"Too Short!").max(255, "To Long!").required("Required"),
    email: Yup.string().min(6,"Too Short!").max(1024, "To Long!").email("Invalid Email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
    passwordc: Yup.string()
              .min(6, 'Too Short!')
              .max(20, 'Too Long!')
              .oneOf([Yup.ref('password'), null], "Passwords don't match!")
              .required('Required'),

});

class Register extends React.Component {

    render() {

        const registrar = (values) =>{
            console.log(values);
            let  usuario = {
                "name":values.name,
               "email": values.email,
               "password": values.password
            }

            fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/register',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Formik initialValues={{ name:"", email: "", password: "", passwordc:"" }}
                            validationSchema={EsquemaFormulari}
                            onSubmit={values => {
                                console.log(values);
                                registrar(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <div>
                                    <div className="row mb-5">
                                        <div className="col-lg-12 text-center">
                                            <h1 className="mt-5">Registrar nuevo usuario</h1>
                                        </div>
                                    </div>
                                    <Form>
                                        <div className="mb-3 row">
                                            <label htmlFor="name" className="col-sm-2 col-form-label">Nombre</label>
                                            <div className="col-sm-10">
                                                <Field
                                                    type="name"
                                                    name="name"
                                                    placeholder="Introducir Nombre"
                                                    className="form-control"
                                                />
                                                {errors.name && touched.name ?
                                                    <div>{errors.name}</div> : null}
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="email" className="col-sm-2 col-form-label">Correo electronico</label>
                                            <div className="col-sm-10">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="Introducir email"
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
                                                    placeholder="Contraseña"
                                                    className="form-control"
                                                />
                                                {errors.password && touched.password ? (
                                                    <div>{errors.password}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="passwordc" className="col-sm-2 col-form-label">Repetir Contraseña</label>
                                            <div className="col-sm-10">
                                                <Field
                                                    type="passwordc"
                                                    name="passwordc"
                                                    placeholder="Repetir Contraseña"
                                                    className="form-control"
                                                />
                                                {errors.passwordc && touched.passwordc ? (
                                                    <div>{errors.passwordc}</div>) : null}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-4 btn-block">Registrar</button>
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
export default Register;