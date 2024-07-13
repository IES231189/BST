import Node from './Node.js';

class ArbolBinario {
    constructor() {
        this.root = null;
    }

    add(producto) {
        if (producto && producto.ID_producto && producto.Nombre && producto.Descripcion && producto.Cantidad && producto.Precio) {
            if (this.root === null) {
                this.root = new Node(producto);
            } else {
                this.insertarNodo(this.root, producto);
            } 
                this.mostrarMaximo();
                this.mostrarMinimo();
          
            return true;
        } else {
            console.error("El objeto producto no tiene las propiedades necesarias.");
            return false;
        }   
            
    }

    insertarNodo(node, producto) {
        if (!node || !producto) {
            console.error("Nodo o producto no definido", { node, producto });
            return;
        }

        if (producto.Cantidad < node.valor.Cantidad) {
            if (node.izquierda === null) {
                console.log(`Insertando ${producto.Nombre} a la izquierda de ${node.valor.Nombre}`);
                node.izquierda = new Node(producto);
            } else {
                this.insertarNodo(node.izquierda, producto);
            }
        } else {
            if (node.derecha === null) {
                node.derecha = new Node(producto);
            } else {
                this.insertarNodo(node.derecha, producto);
            }
        }
    }

    search(nombre) {
        return this.buscarNodo(this.root, nombre);
    }

    buscarNodo(nodo, nombre) {
        if (nodo === null) {
            return null;
        }

        if (nombre === nodo.valor.Nombre) {
            return nodo.valor;
        }

        const izquierda = this.buscarNodo(nodo.izquierda, nombre);
        if (izquierda !== null) {
            return izquierda;
        }

        return this.buscarNodo(nodo.derecha, nombre);
    }
    

    cantidadMayor() {
        return this.buscarCantidadMayor(this.root);
    }

    buscarCantidadMayor(nodo) {
        if (nodo === null) {
            return null;
        }

        let max = nodo.valor;
        const maxIzquierda = this.buscarCantidadMayor(nodo.izquierda);
        const maxDerecha = this.buscarCantidadMayor(nodo.derecha);

        if (maxIzquierda && maxIzquierda.Cantidad > max.Cantidad) {
            max = maxIzquierda;
        }

        if (maxDerecha && maxDerecha.Cantidad > max.Cantidad) {
            max = maxDerecha;
        }

        return max;
    }

    cantidadMenor() {
        return this.buscarCantidadMenor(this.root);
    }

    buscarCantidadMenor(nodo) {
        if (nodo === null) {
            return null;
        }

        let min = nodo.valor;
        const minIzquierda = this.buscarCantidadMenor(nodo.izquierda);
        const minDerecha = this.buscarCantidadMenor(nodo.derecha);

        if (minIzquierda && minIzquierda.Cantidad < min.Cantidad) {
            min = minIzquierda;
        }

        if (minDerecha && minDerecha.Cantidad < min.Cantidad) {
            min = minDerecha;
        }

        return min;
    }

    mostrarMaximo() {
        const maximoProducto = this.cantidadMayor();
        const contenedorMaximo = document.getElementById('maximo-producto');
        if (maximoProducto) {
            console.log(maximoProducto);
            contenedorMaximo.innerHTML = `
                <div>ID: ${maximoProducto.ID_producto}</div>
                <div>Nombre: ${maximoProducto.Nombre}</div>
                <div>Descripción: ${maximoProducto.Descripcion}</div>
                <div>Cantidad: ${maximoProducto.Cantidad}</div>
                <div>Precio: ${maximoProducto.Precio}</div>
            `;
        } else {
            contenedorMaximo.innerHTML = 'No hay productos en el árbol';
        }
    }

    mostrarMinimo() {
        const minimoProducto = this.cantidadMenor();
        const contenedorMinimo = document.getElementById('minimo-producto');
        if (minimoProducto) {
            contenedorMinimo.innerHTML = `
                <div>ID: ${minimoProducto.ID_producto}</div>
                <div>Nombre: ${minimoProducto.Nombre}</div>
                <div>Descripción: ${minimoProducto.Descripcion}</div>
                <div>Cantidad: ${minimoProducto.Cantidad}</div>
                <div>Precio: ${minimoProducto.Precio}</div>
            `;
        }
    }

    mostrarArbol() {
        return this.generarTablaHTML(this.root);
    }

    generarTablaHTML(nodo) {
        let html = '<table><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Cantidad</th><th>Precio</th></tr>';
        let contador = { count: 0 };
        html += this.inOrden(nodo, contador);
        html += '</table>';
        return html;
    }

    inOrden(nodo, contador) {
        let html = '';
        if (nodo !== null && contador.count < 4) {
            html += this.inOrden(nodo.izquierda, contador);
            if (nodo.valor && contador.count < 5) {
                html += `<tr><td>${nodo.valor.ID_producto}</td><td>${nodo.valor.Nombre}</td><td>${nodo.valor.Descripcion}</td><td>${nodo.valor.Cantidad}</td><td>${nodo.valor.Precio}</td></tr>`;
                contador.count++;
            }
            html += this.inOrden(nodo.derecha, contador);
        }
        return html;
    }
}

export default ArbolBinario;
