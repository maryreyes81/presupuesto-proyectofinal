class Egreso extends Dato {
static contadorEgresos = 0;

constructor(descripcion, valor) {
    super(descripcion, valor);
    this._id = ++Egreso.contadorEgresos; // Preincremento para asignar un ID único
  }

  get id() {
    return this._id;
  }
}


