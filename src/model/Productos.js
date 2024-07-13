class Producto {
    constructor(nombre, descripcion, cantidad, precio) {
        this.ID_producto = this.generarId();
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Cantidad = cantidad;
        this.Precio = precio;
    }

    generarId() {
        return '_' + Math.random().toString(36).substring(2, 9);
    }

    
}

export default Producto;
