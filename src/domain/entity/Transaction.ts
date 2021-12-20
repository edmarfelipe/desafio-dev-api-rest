export class Transaction {
  static TABLE_NAME = 'transacoes';

  idTransacao!: number;
  idConta: number;
  valor: number;
  dataTransacao: Date;

  constructor(idConta: number, valor: number) {
    this.valor = valor;
    this.idConta = idConta;
    this.dataTransacao = new Date();
  }
}
