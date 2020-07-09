import { Component, OnInit } from '@angular/core';
import { AdminApiService } from './admin.api.service';
import { User } from '@shared/models/user';
import { Product } from '@shared/models/product';
import { Organization } from '@shared/models/organization';
import { AuthService } from '@shared/services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users = [];
  products = [];
  organizations = [];
  selectedUser: User = null;
  selectedProduct: Product = null;
  selectedOrganization: Organization = null;
  selectedStatus1 = null;
  selectedStatus2 = null;
  selectedStatus3 = null;
  productName = '';
  productDes = '';
  faSpinner = faSpinner;
  loader = false;

  constructor(
    private adminService: AdminApiService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,

    ) { }

  async ngOnInit() {
    this.showSpinner();
    await this.getAllProducts();
    await this.getAllUsers();
    await this.getAllOrganizations();
    const uId = await this.authService.isAdmin();
    this.hideSpinner();

  }

  async getAllUsers() {
    this.users = await this.adminService.getAllUsers();
  }

  async getAllProducts() {
    this.products = await this.adminService.getAllProducts();
  }

  async getAllOrganizations() {
    this.organizations = await this.adminService.getAllOrganizations();
  }

  async addUserToProject() {
    if (this.selectedProduct != null && this.selectedUser != null) {
      const result = await this.adminService.addProductUser(this.selectedProduct.id, this.selectedUser.id);
      console.log(result);
    } else {
      console.log('Please select a User and Product');
    }
  }

  async addProduct() {
    const product = new Product();
    product.name = this.productName;
    product.description = this.productDes;
    product.organizationId = this.selectedOrganization.id;
    const uId = await this.authService.getCurrentUserId();
    product.userId = Number(uId);
    const result = await this.adminService.addProduct(product);
  }

  setProductId(product: any) {
    this.selectedProduct = product;
  }

  setSelectedUser(user: any) {
    this.selectedUser = user;
  }

  setSelectedOrganization(org: any) {
    this.selectedOrganization = org;
  }
  async showSpinner() {
    this.spinner.show();
  }

  async hideSpinner() {
    this.loader = true;
    this.spinner.hide();
  }
}
