import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { userRoute } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private httpClient: HttpClient) {}

  public async get(email: string): Promise<User[]> {
    const result = await this.httpClient
      .get(`${userRoute}/email/${email}`)
      .toPromise();
    return result as User[];
  }

  public async getusersByProduct(id: number) {
    const result = await this.httpClient
      .get(`${userRoute}/product/${id}`)
      .toPromise();
    return result['body'];
  }
}
