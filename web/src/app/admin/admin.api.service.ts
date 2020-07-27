import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { adminRoute } from '../shared/constants';
import { User } from '@shared/models/user';
import { Organization } from '@shared/models/organization';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private httpClient: HttpClient) {}

  public async getAllProducts(): Promise<Product[]> {
    const result = await this.httpClient
      .get(adminRoute + '/products')
      .toPromise();
    return JSON.parse(result['body']) as Product[];
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.httpClient.get(adminRoute + '/users').toPromise();
    return JSON.parse(result['body']) as User[];
  }

  async getAllOrganizations(): Promise<Organization[]> {
    const result = await this.httpClient
      .get(adminRoute + '/organizations')
      .toPromise();
    return JSON.parse(result['body']) as Organization[];
  }

  public async addProductUser(pId: number, uId: number): Promise<boolean> {
    const result = await this.httpClient
      .post(adminRoute + '/userProducts', {
        productId: pId,
        userId: uId,
      })
      .toPromise();
    return JSON.parse(result['body']);
  }

  public async addProduct(product: Product): Promise<boolean> {
    const result = await this.httpClient
      .post(adminRoute + '/product', { product })
      .toPromise();
    return JSON.parse(result['body']);
  }

  public async addOrganization(organization: Organization): Promise<boolean> {
    const result = await this.httpClient
      .post(adminRoute + '/organizations', { organization })
      .toPromise();
    return JSON.parse(result['body']);
  }
}
