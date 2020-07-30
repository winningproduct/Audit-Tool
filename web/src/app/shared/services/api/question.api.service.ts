import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../models/question';
import { knowledgeAreaRoute, questionRoute } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class QuestionApiService {
  constructor(private httpClient: HttpClient) {}

  public async get(knowledgeAreaId: number): Promise<Question[]> {
    const result = await this.httpClient
      .get(`${knowledgeAreaRoute}/${knowledgeAreaId}/questions`)
      .toPromise();
    return JSON.parse(result['body']) as Question[];
  }

  public async getById(id: number): Promise<Question[]> {
    const result = await this.httpClient
      .get(`${questionRoute}/${id}`)
      .toPromise();
    return JSON.parse(result['body']) as Question[];
  }
}
