
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const EsquemaFormulari = Yup.object().shape({
    nombre: Yup.string().min(4, "Too Short!").max(60, "To Long!").required("Required"),
    precio: Yup.number().min(0, "Minim 0").required("Required"),
    tallas: Yup.string().required("Required"),
});


const addModal = (values) => {
    console.log(values);
    values.tallas.toUpperCase();
    let arrayTallas = values.tallas.split(" ");
    console.log(arrayTallas);

    let token = JSON.parse(localStorage.getItem("Token"));

    let modal = {

        "nombre": values.nombre,
        "precio": values.precio,
        "tallas": arrayTallas
    }

    fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "auth-token": token
        },
        body: JSON.stringify(modal)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

        });



}



const actualizar = (value) =>{
    console.log(value.id);
}

const Productos = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //obtener productos
        obtenerProductos();
    }, []);


    const obtenerProductos = () => {

        let token = JSON.parse(localStorage.getItem("Token"));

        fetch('https://api.tendaciclista.ccpegoilesvalls.es/api/productos', {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "auth-token": token
            }
        })


            .then(response => response.json())
            .then(data => {
                console.log(data.data.data);
                setProducts(data.data.data);
            });
    }


    return (
        <div className="container">
            <div className="row">
                <div>
                    <div className="row mb-5">
                        <div className="col-lg-12">
                            <h1 className="mt-5">Productos</h1>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                                Agregar Producto
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th>Tallas</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(producte => {
                                        return (
                                            <tr>
                                                <td>{producte.nombre}</td>
                                                <td>{producte.precio}</td>
                                                <td>{producte.tallas}</td>
                                                <td>
                                                    <button type="button" id={producte._id} onClick={()=>{actualizar()}} className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#editModal">
                                                        <i class="bi bi-pencil-square"></i>
                                                    </button>

                                                    <Button className="btn-danger"><i class="bi bi-trash"></i></Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Formik initialValues={{ nombre: "", precio: "", tallas: "" }}
                                    validationSchema={EsquemaFormulari}
                                    onSubmit={values => {
                                        //console.log(values);
                                        addModal(values);

                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <div>
                                            <Form>
                                                <div className="mb-3 row">
                                                    <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                                                    <div className="col-sm-10">
                                                        <Field
                                                            type="nombre"
                                                            name="nombre"

                                                            className="form-control"
                                                        />
                                                        {errors.nombre && touched.nombre ?
                                                            <div>{errors.nombre}</div> : null}
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label htmlFor="precio" className="col-sm-2 col-form-label">Precio</label>
                                                    <div className="col-sm-10">
                                                        <Field
                                                            type="number"
                                                            name="precio"

                                                            className="form-control"
                                                        />
                                                        {errors.precio && touched.precio ? (
                                                            <div>{errors.precio}</div>) : null}
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label htmlFor="tallas" className="col-sm-2 col-form-label">Tallas</label>
                                                    <div className="col-sm-10">
                                                        <Field
                                                            type="tallas"
                                                            name="tallas"

                                                            className="form-control"
                                                        />
                                                        {errors.tallas && touched.tallas ? (
                                                            <div>{errors.tallas}</div>) : null}
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-primary mt-4 me-2 btn-block">Insertar</button>
                                                    <button type="button" class="btn btn-primary mt-4 me-2" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                                                </div>
                                            </Form>
                                        </div>
                                    )}
                                </Formik>

                            </div>

                        </div>
                    </div>
                </div>

                <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <Formik initialValues={{ nombre: "", precio: "", tallas: "" }}
                                    validationSchema={EsquemaFormulari}
                                    onSubmit={values => {
                                        //console.log(values);
                                        addModal(values);

                                    }}
                                >
                                    {({ errors, touched }) => (
                                        <div>
                                            <Form>
                                                <div className="mb-3 row">
                                                    <label htmlFor="nombre" className="col-sm-2 col-form-label">Nombre</label>
                                                    <div className="col-sm-10">
                                                        <Field
                                                            type="nombre"
                                                            name="nombre"

                                                            className="form-control"
                                                        />
                                                        {errors.nombre && touched.nombre ?
                                                            <div>{errors.nombre}</div> : null}
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label htmlFor="precio" className="col-sm-2 col-form-label">Precio</label>
                                                    <div className="col-sm-10">
                                                        <Field
                                                            type="number"
                                                            name="precio"

                                                            className="form-control"
                                                        />
                                                        {errors.precio && touched.precio ? (
                                                            <div>{errors.precio}</div>) : null}
                                                    </div>
                                                </div>
                                                <div className="mb-3 row">
                                                    <label htmlFor="tallas" className="col-sm-2 col-form-label">Tallas</label>
                                                    <div className="col-sm-10">
                                                        <Field
                                                            type="tallas"
                                                            name="tallas"

                                                            className="form-control"
                                                        />
                                                        {errors.tallas && touched.tallas ? (
                                                            <div>{errors.tallas}</div>) : null}
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-primary mt-4 me-2 btn-block">Insertar</button>
                                                    <button type="button" class="btn btn-primary mt-4 me-2" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                                                </div>
                                            </Form>
                                        </div>
                                    )}
                                </Formik>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Productos;