import { bst } from "./dependencies.js";
import Producto from "../model/Productos.js"; 



document.getElementById('form-productos').addEventListener('submit', function(event) {
    event.preventDefault();
    
    console.log("Formulario enviado");

    const nombre = document.getElementById('name').value;
    const descripcion = document.getElementById('descripcion').value;
    const cantidad = parseInt(document.getElementById('cantidad').value, 10);
    const precio = parseFloat(document.getElementById('precio').value);

    console.log("Datos del formulario:", nombre, descripcion, cantidad, precio);
    
    const nuevoProducto = new Producto(nombre, descripcion, cantidad, precio);
    console.log(nuevoProducto);
    
    if(bst.add(nuevoProducto)){
       alert('Producto agregado exitosamente');
    }

   console.log(bst);
    
    const tablaHTML = bst.mostrarArbol();
    document.getElementById('arbol-productos').innerHTML = tablaHTML;
   
    document.getElementById('form-productos').reset();
});




document.getElementById('buscar').addEventListener('click',function(){
    const nombre = document.getElementById('search-productos').value;
    const resultado = bst.search(nombre);
if(resultado){
    document.getElementById('resultado-productos').innerHTML=
    `<table>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Precio</th>
        </tr>
        <tr>
            <td>${resultado.ID_producto}</td>
            <td>${resultado.Nombre}</td>
            <td>${resultado.Descripcion}</td>
            <td>${resultado.Cantidad}</td>
            <td>${resultado.Precio}</td>
        </tr>

    </table>`;
}else{
    if(resultado == null){
        document.getElementById('resultado-productos').innerHTML='Aun no ha sido agregado un elemento al nodo';
        alert('aun no ha sido agregado un elemento o el producto no se encuentra');
    }

}

});