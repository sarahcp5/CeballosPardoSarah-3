const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
        this.listaContenedor = [];
        this.id = 0;
    }

    async save(object) {
        this.id++;
        object['id'] = this.id;

        this.listaContenedor.push(object);

        try {
            await this.write();
        }
        catch {
            console.log(`Error al intentar agregar el Objeto con el Id ${this.id} del archivo: ${this.nombre}`);
        }

        return this.id;
    }

    getById(numberId) {
        let object = this.listaContenedor.filter((object) => {
            return object.id == numberId;
        });
        return object.length != 0 ? object[0] : null;
    }

    getAll() {
        return this.listaContenedor;
    }

    async deleteById(numberId) {
        this.listaContenedor = this.listaContenedor.filter((object) => {
            return object.id != numberId;
        })
        try {
            await this.write();
        }
        catch {
            console.log(`Error al intentar eliminar el Objeto con el Id ${numberId} del archivo: ${this.nombre}`);
        }
    }

    async deleteAll() {
        for (let i = this.listaContenedor.length; i > 0; i--) {
            this.listaContenedor.pop();
        }
        try {
            await this.write();
        }
        catch {
            console.log(`Error al intentar eliminar todos los Objetos del archivo: ${this.nombre}`);
        }
    }

    async write() {
        if(this.listaContenedor.length == 0) {
            await fs.promises.writeFile(this.nombre, '')
        }
        else{
            let cadena = JSON.stringify(this.listaContenedor);
            await fs.promises.writeFile(this.nombre, cadena)
        }
    } 

    async main() {
        try {
            const contenido = await fs.promises.readFile(this.nombre);
            this.listaContenedor = JSON.parse(contenido);
            for(let contenedor of this.listaContenedor) {
                if (contenedor.id > this.id) {
                    this.id = contenedor.id;
                }
            }
        } catch (error) {
            console.log(`Actualmente no existe un archivo con el nombre: ${this.nombre}`);
        }
    }
}

module.exports = Contenedor;