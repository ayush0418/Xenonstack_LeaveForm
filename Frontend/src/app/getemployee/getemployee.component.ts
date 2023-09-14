import { ApiService } from '../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getemployee',
  templateUrl: './getemployee.component.html',
  styleUrls: ['./getemployee.component.css']
})
export class GetemployeeComponent implements OnInit {
  employees: any;
  constructor(private router: Router, private apiService: ApiService) { }
 
  getform() {
    this.router.navigate([''])
  }

  ngOnInit() {
    this.apiService.getEmployeeData().subscribe((data) => {
      this.employees = data;
    });
  }

  onApprove(id: any) {
    this.apiService.approveEmployee(id).subscribe((data) =>{
      this.employees = data;
    })
    alert("Employee Leave Approved")
    this.apiService.getEmployeeData().subscribe((data) => {
      this.employees = data;
    });
  }

  onReject(id: any) {
    this.apiService.rejectEmployee(id).subscribe((data) => {
      this.employees = data;
    })
    alert("Employee Leave Rejected")
    this.apiService.getEmployeeData().subscribe((data) => {
      this.employees = data;
    });
    
  }
}