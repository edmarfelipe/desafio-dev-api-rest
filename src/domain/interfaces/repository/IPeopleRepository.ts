import { People } from '@domain/entity/People';

export interface IPeopleRepository {
  get(id: number): People;
  getByCpf(cpf: string): People;
}
