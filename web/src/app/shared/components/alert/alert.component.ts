import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  // @Input() message: any;
  // @Input() title: any;

  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  showSuccess(message: any, title: any) {
    this.toastr.success(message, title);
  }

  showError(message: any, title: any) {
    this.toastr.error(message, title);
  }
}