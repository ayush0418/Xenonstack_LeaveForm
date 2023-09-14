import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  submitEmployeeData(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/emp`, formData);
  }

  getEmployeeData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee`);
  }

  approveEmployee(id: any): Observable<any> {
    console.log("id2: ", id);
    return this.http.put(`${this.apiUrl}/employee/${id}/approved`, 'Approved')
  }

  rejectEmployee(id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employee/${id}/rejected`, 'Rejected')
  }

}
