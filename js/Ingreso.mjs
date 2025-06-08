


 export class Ingreso extends Dato {
  static contadorIngresos = 0;

  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._id = ++Ingreso.contadorIngresos; // Preincremento para asignar ID único
  }

  get id() {
    return this._id;
  }
}

