import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  top5employees: any;
  august2022: any;
  maximumMonth2022: any;
  employeesUnderManager: any;
  teamRanking2022: any;
  teamRanking2022Distribution: any;

  constructor(private router: Router, private apiService: ApiService) { }

  getemployee() {
    this.router.navigate(['/getEmployee']);
  }

  getkpi() {
    this.router.navigate(['/kpi']);
  }

  ngOnInit(): void {

    this.apiService.getDashboard_Top5EmployeesData().subscribe((data) => {
      this.top5employees = data;
    });

    this.apiService.getDashboard_August2022Data().subscribe((data) => {
      this.august2022 = data;
    });

    this.apiService.getDashboard_MaximumMonth2022Data().subscribe((data) => {
      this.maximumMonth2022 = data;
    });

    this.apiService.getDashboard_EmployeesUnderManagerData().subscribe((data) => {
      this.employeesUnderManager = data;
    });

    this.apiService.getDashboard_TeamRanking2022Data().subscribe((data) => {
      this.teamRanking2022 = data;
    });

    this.apiService.getDashboard_TeamRanking2022DistributionData().subscribe((data) => {
      this.teamRanking2022Distribution = data;
    });

  }
}
