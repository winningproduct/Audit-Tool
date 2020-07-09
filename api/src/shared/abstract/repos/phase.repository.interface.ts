import { IRepository } from './repository.interface';
import { Phase } from '../../models//phase';

export interface IPhaseRepository extends IRepository<Phase> {
  getPhases(_productId: number): Promise<Phase[]>;
  getPhaseByProductPhaseId(_productId: number): Promise<Phase[]>;
  getQuestionCount(_productId: number, _phaseId: number): Promise<any>;
}
