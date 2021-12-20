export class Account {
  static TABLE_NAME = 'contas';

  idConta: number;
  idPessoa: number;
  limiteSaqueDiario: number;
  flagAtivo: boolean;
  saldo: number;
  dataCriacao: Date;

  constructor(idPessoa: number) {
    this.idPessoa = idPessoa;
    this.limiteSaqueDiario = 1000;
    this.flagAtivo = true;
    this.saldo = 0;
    this.dataCriacao = new Date();
  }
}
