import { ApiService } from '../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notification: any;
  constructor(private router: Router, private apiService: ApiService) { }
 
  getemployee() {
    this.router.navigate(['/getEmployee'])
  }

  ngOnInit() {
    this.apiService.getNotificationData().subscribe((data) => {
      this.notification = data;
    });
  }

  onApprove(id: any) {
    this.apiService.approveEmployee(id).subscribe((data) =>{
      this.notification = data;
    })
    alert("Employee Leave Approved")
    this.apiService.getNotificationData().subscribe((data) => {
      this.notification = data;
    });
  }

  onReject(id: any) {
    this.apiService.rejectEmployee(id).subscribe((data) => {
      this.notification = data;
    })
    alert("Employee Leave Rejected")
    this.apiService.getNotificationData().subscribe((data) => {
      this.notification = data;
    });
    
  }
}