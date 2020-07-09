import { productRoute, questionRoute, evidenceRoute } from './../../constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evidence } from '@shared/models/evidence';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvidenceApiService {
  private id = new BehaviorSubject(null);
  evidenceId = this.id.asObservable();

  constructor(private httpClient: HttpClient) {}

  setEvidenceId(id: number) {
   this.id.next(id);
  }

  public async get(id: number, qid: number): Promise<Evidence[]> {
    const result = await this.httpClient
      .get(productRoute + '/' + id + '/questions/' + qid + '/evidence')
      .toPromise();
    return JSON.parse(result['body']) as Evidence[];
  }

  async updateStatus(id: number, status: any, eid: number): Promise<boolean> {
    const state = {status};
    const url = questionRoute + '/' + id + '/evidence/' + eid;
    const result = await this.httpClient.put(url, state).toPromise();
    return JSON.parse(result['body']) as boolean;
  }

  async post(id: number, data: Evidence): Promise<boolean> {
    const result = await this.httpClient
      .post(questionRoute + '/' + id + '/evidence', data)
      .toPromise();
    return JSON.parse(result['body']) as boolean;
  }

  public async getEvidenceVersions(productId: number, questionId: number, pageId: number): Promise<Evidence[]> {
    const result = await this.httpClient
      .get(productRoute + '/' + productId + '/question/' + questionId + '/page/' + pageId )
      .toPromise();
    return JSON.parse(result['body']);
  }

  public async getEvidenceVersionsByDate(productId: number, questionId: number, date: string): Promise<Evidence[]> {
    const result = await this.httpClient
      .get(productRoute + '/' + productId + '/question/' + questionId + '/evidence/date/' + date )
      .toPromise();
    return JSON.parse(result['body']);
  }

  async getEvidenceById(evidenceId: number): Promise<Evidence[]> {
    const result = await this.httpClient
      .get(evidenceRoute + '/' + evidenceId)
      .toPromise();
    return JSON.parse(result['body']);
  }

  async revertEvidence(questionId: number, productId: number, evidenceId: number): Promise<boolean> {
    const data = {
      productId,
      evidenceId
    };
    const result = await this.httpClient
      .post(questionRoute + '/' + questionId + '/revertEvidence', data)
      .toPromise();
    return JSON.parse(result['body']) as boolean;
  }
}
