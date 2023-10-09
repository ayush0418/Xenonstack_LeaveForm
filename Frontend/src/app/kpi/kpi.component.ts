import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { concat } from 'rxjs';
import 'chartjs-plugin-datalabels'; // Import the plugin

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})


export class KpiComponent {
  top5employees: any;
  employeesUnderManager: any;
  teamRanking2022Distribution: any;
  chart: any;


  constructor(private router: Router, private apiService: ApiService) { }
  getemployee() {
    this.router.navigate(['/getEmployee']);
  }

  getdashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {

    this.apiService.getDashboard_Top5EmployeesData().subscribe((data) => {
      this.top5employees = data;
    });

    this.apiService.getDashboard_EmployeesUnderManagerData().subscribe((data) => {
      this.employeesUnderManager = data;
      this.barChart(this.employeesUnderManager);
    });

    this.apiService.getDashboard_TeamRanking2022DistributionData().subscribe((data) => {
      this.teamRanking2022Distribution = data;
      this.pieChart1(this.teamRanking2022Distribution);
      this.pieChart2(this.teamRanking2022Distribution);
      this.pieChart3(this.teamRanking2022Distribution);
    });


  }

  barChart(data: any) {
    console.log("ayush bansal")
    const labels = data.map((item: any) => item.reporter);  // x axis
    const values = data.map((item: any) => item.count);     // y axis


    console.log(labels);
    console.log(values);
    this.chart = new Chart("BarChart", {
      type: 'bar',

      data: {
        labels: labels,
        datasets: [
          {
            label: "No. of Employees on Leave in First Quater 2023",
            data: values,
            backgroundColor: [
              'rgba(88, 133, 88,1)',
            ],
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  pieChart1(data: any) {
    const teams = [...new Set(data.map((item: any) => item.teamname))];
    const leaveTypes = [...new Set(data.map((item: any) => item.leavetype))];

    const datasets = leaveTypes.map((leaveType, index) => {
      const values = teams.map(team => {
        const item = data.find((entry: any) => entry.teamname === team && entry.leavetype === leaveType);
        return item ? item.count : 0;
      });

      return {
        label: leaveType,
        data: values,
        backgroundColor: [
          'rgba(92, 184, 92,1)',
          'rgba(255, 195, 0, 1)',
        ],
      };
    });
    // Calculate total counts for each team
    const totalCounts = teams.map(team => {
      return data.reduce((acc: number, item: any) => {
        if (item.teamname === team) {
          acc += item.count;
        }
        return acc;
      }, 0);
    });

    // Add total counts as a separate dataset
    datasets.push({
      label: 'Total Count',
      data: totalCounts,
      backgroundColor: [
        'rgba(92, 184, 92,0.75)',
        'rgba(255, 195, 0, 0.75)',
      ],
    });
    this.chart = new Chart("PieChart1", {
      type: 'doughnut',
      data: {
        labels: teams,
        datasets: datasets,
      },
      options: {
        cutout: '25%',
        aspectRatio: 1.6
      }
    });
  }

  pieChart2(data: any) {
    const values = data.map((item: any) => item.count);
    const leavetype = data.map((item: any) => item.leavetype);
    const uniqueLeavetype = [...new Set(leavetype)]; // Get unique team names

    this.chart = new Chart("PieChart2", {
      type: 'pie',
      data: {
        labels: uniqueLeavetype,
        datasets: [
          {
            label: 'Total Count',
            data: [values[0], values[1], values[2]],
            backgroundColor: [
              'rgba(92, 184, 92,1)',
              'rgba(255, 195, 0, 1)',
              'rgba(217, 83, 79,1)',
              'rgba(129, 78, 40, 1)',
              'rgba(129, 199, 111, 1)',
              'rgba(19, 19, 111, 1)'
            ]
          },
        ]
      },
      options: {
        aspectRatio: 1.6
      }
    });
  }

  pieChart3(data: any) {
    const values = data.map((item: any) => item.count);
    const leavetype = data.map((item: any) => item.leavetype);
    const uniqueLeavetype = [...new Set(leavetype)]; // Get unique team names

    this.chart = new Chart("PieChart3", {
      type: 'pie',
      data: {
        labels: uniqueLeavetype,
        datasets: [
          {
            label: 'Total Count',
            data: [values[3], values[4], values[5]],
            backgroundColor: [
              'rgba(92, 184, 92,1)',
              'rgba(255, 195, 0, 1)',
              'rgba(217, 83, 79,1)',
              'rgba(129, 78, 40, 1)',
              'rgba(129, 199, 111, 1)',
              'rgba(19, 19, 111, 1)'
            ]
          },
        ]
      },
      options: {
        aspectRatio: 1.6
      }
    });
  }
}