import { Component, OnInit } from '@angular/core';
import { AdminApiService } from './admin.api.service';
import { User } from '@shared/models/user';
import { Product } from '@shared/models/product';
import { Organization } from '@shared/models/organization';
import { AuthService } from '@shared/services/auth/auth.service';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users = [];
  products = [];
  organizations = [];
  selectedUser: User = null;
  selectedProduct: Product = null;
  selectedOrganization: Organization = null;
  currentUser = null;
  selectedStatus1 = null;
  selectedStatus2 = null;
  selectedStatus3 = null;
  selectedStatus4 = null;
  productName = '';
  productDes = '';
  addMe = true;
  organizationName = '';
  organizationEmail = '';
  organizationPhone = '';
  faSpinner = faSpinner;
  loader = false;

  constructor(
    private adminService: AdminApiService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alert: AlertComponent,
  ) {}

  async ngOnInit() {
    this.showSpinner();
    await this.getCurrentUser();
    await this.getAllProducts();
    await this.getAllUsers();
    await this.getAllOrganizations();
    this.setSelectedUser(
      this.users.filter((user) => user.id === Number(this.currentUser))[0],
    );
    this.selectedStatus4 = Number(this.currentUser);
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

  async getCurrentUser() {
    this.currentUser = await this.authService.getCurrentUserId();
  }

  async addUserToProject() {
    if (this.selectedProduct && this.selectedUser) {
      const result = await this.adminService.addProductUser(
        this.selectedProduct.id,
        this.selectedUser.id,
      );

      if (result === true) {
        this.reset();
        this.alert.showSuccess('User added successfuly', 'Done');
      } else {
        this.alert.showError('Cannot add the user', 'Error');
      }
    } else {
      this.alert.showError('Please select a User and Product', 'Warning');
    }
  }

  async addProduct() {

    if (this.productName && this.selectedOrganization && this.selectedUser) {
      const product = new Product();
      product.name = this.productName;
      product.description = this.productDes;
      product.organizationId = this.selectedOrganization.id;
      product.userId = this.selectedUser.id;

      const result = await this.adminService.addProduct(product);

      if (result) {
        this.reset();
        this.alert.showSuccess('Product added successfuly', 'Done');
      } else {
        this.alert.showError('Cannot add the product', 'Error');
      }
    } else {
      this.alert.showError('Product name and organization is required', 'Error');
    }
  }

  async addOrganization() {

    if (this.organizationName) {
      const organization = new Organization();
      organization.name = this.organizationName;
      organization.email = this.organizationEmail;
      organization.phoneNumber = this.organizationPhone;

      const result = await this.adminService.addOrganization(organization);

      if (result) {
        this.reset();
        this.alert.showSuccess('Organization added successfuly', 'Done');
      } else {
        this.alert.showError('Cannot add the organization', 'Error');
      }
    } else {
      this.alert.showError('Organization name is required', 'Error');
    }
  }

  reset() {
    this.productName = "";
    this.productDes = "";
    this.selectedOrganization = null;
    this.selectedUser = null;
    this.selectedProduct = null ;
    this.organizationName = '';
    this.organizationEmail = "";
    this.organizationPhone = "";
    this.selectedStatus1 = null;
    this.selectedStatus2 = null;
    this.selectedStatus3 = null;
    this.selectedStatus4 = null;
    this.ngOnInit();
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
