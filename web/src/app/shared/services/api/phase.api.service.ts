import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Phase } from '../../models/phase';
import { productRoute, questionRoute } from '../../constants';


@Injectable({
    providedIn: 'root',
})
export class PhaseApiService {
    constructor(private httpClient: HttpClient) { }

    public async get(id: number): Promise<Phase[]> {
        const result = await this.httpClient.get(`${productRoute}/${id}/phases}`).toPromise();
        return JSON.parse(result['body']) as Phase[];
    }

    public async getPhaseByProductPhaseId(id: number): Promise<Phase> {
        const result = await this.httpClient.get(`${productRoute}/${id}/productPhase`).toPromise();
        return JSON.parse(result['body']) as Phase;
    }

    public async getQuestionCount(productId: number, phaseId: number): Promise<any> {
        const result = await this.httpClient
          .get(`${questionRoute}Count/phase/${productId}/${phaseId}`)
          .toPromise();
        return JSON.parse(result['body']);
    }

}
