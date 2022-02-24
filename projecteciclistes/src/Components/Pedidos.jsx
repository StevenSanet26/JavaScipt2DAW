
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import React, { useEffect, useState } from "react";

const EsquemaFormulari = Yup.object().shape({
    name: Yup.string().min(6, "Too Short!").max(255, "To Long!").required("Required"),
    email: Yup.string().min(6, "Too Short!").max(1024, "To Long!").email("Invalid Email").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
    passwordc: Yup.string()
        .min(6, 'Too Short!')
        .max(20, 'Too Long!')
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
        .required('Required'),

});




const Productos = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //obtener productos
        obtenerProductos();
    }, []);




const obtenerProductos = () => {

    let token = JSON.parse(localStorage.getItem("Token"));

    fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos',{
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "auth-token": token
        }
    })


        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProducts(data);
        });
}




     
        return (
            <div className="container">
                <div className="row">


                    <div>
                        <div className="row mb-5">
                            <div className="col-lg-12">
                                <h1 className="mt-5">Productos</h1>
                                <button type="button" className="btn btn-primary mt-4 btn-block">Agregar Productos</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Descripción</th>
                                            <th>Precio</th>
                                            <th>Tallas</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>



                    </div>

                </div>
            </div>

        );
    
}


export default Productos;