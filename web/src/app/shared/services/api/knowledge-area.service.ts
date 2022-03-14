import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KnowledgeArea } from '../../models/knowledge-area';
import { productPhaseRoute, knowledgeAreaRoute, questionRoute } from '../../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeAreaApiService {

  public ACount = new BehaviorSubject(0);
  sharedACount = this.ACount.asObservable();

  constructor(private httpClient: HttpClient) {}

  public async get(id: number): Promise<KnowledgeArea[]> {
    const result = await this.httpClient
      .get(`${productPhaseRoute}/${id}/knowledgeAreas`)
      .toPromise();
    return JSON.parse(result['body']) as KnowledgeArea[];
  }

  public async getQuestionCount(id: number, productId: number): Promise<any> {
    const result = await this.httpClient
      .get(`${questionRoute}Count/knowledgeArea/${productId}/${id}`)
      .toPromise();
    return JSON.parse(result['body']);
  }

  public async getById(id: number): Promise<KnowledgeArea[]> {
    const result = await this.httpClient
      .get(`${knowledgeAreaRoute}/${id}`)
      .toPromise();
    return JSON.parse(result['body']) as KnowledgeArea[];
  }

  nextMessage(count: number) {
    this.ACount.next(count);
  }

}
