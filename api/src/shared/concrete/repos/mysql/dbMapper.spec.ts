import { Question } from './../../../models/question';
import { Product } from './../../../models/product';
import {
  productMapper,
  knowledgeAreaMapper,
  questionMapper,
  phasesMapper,
} from './dbMapper';
import { KnowledgeArea } from '../../../models/knowledge-area';
import { Phase } from '../../../models/phase';
describe('database mapper', () => {
  test('map data object to product', () => {
    const result = productMapper({
      Id: 1,
      Name: 'test',
      Description: 'test description',
      CreatedDate: '2019-10-31',
    });
    expect(result).toEqual({
      id: 1,
      name: 'test',
      description: 'test description',
      createdDate: '2019-10-31',
    } as Product);
  });

  test('map data object to knowledgeArea', () => {
    const result = knowledgeAreaMapper({
      Id: 1,
      Name: 'test',
      Description: 'test description',
      PhaseId: 1,
      Score: 3,
    });
    expect(result).toEqual({
      id: 1,
      name: 'test',
      description: 'test description',
      phaseId: 1,
      score: 3,
    } as KnowledgeArea);
  });

  test('map data object to question', () => {
    const result = questionMapper({
      Id: 1,
      KnowledgeAreaId: 1,
      RevisionId: 1,
      UserId: 1,
      Title: 'test',
      Description: 'test description',
      Version: 1,
      CreatedDate: '2019-10-31',
    });
    expect(result).toEqual({
      id: 1,
      knowledgeAreaId: 1,
      revisionId: 1,
      userId: 1,
      title: 'test',
      description: 'test description',
      version: 1,
      createdDate: '2019-10-31',
    } as Question);
  });

  test('map data object to phase', () => {
    const result = phasesMapper({
      Id: 1,
      PhaseId: 1,
      Name: 'test',
      Description: 'test description',
      Score: 3,
    });
    expect(result).toEqual({
      productPhaseId: 1,
      name: 'test',
      description: 'test description',
      phaseId: 1,
      score: 3,
    } as Phase);
  });
});
