// Running 5 Test cases

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    // Test Case 1
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Test Case 2
    it('should submit employee data', () => {
        const formData = new FormData();
        service.submitEmployeeData(formData).subscribe(response => { });
        const req = httpMock.expectOne('http://localhost:8081/emp');
        expect(req.request.method).toBe('POST');
    });

    // Test Case 3
    it('should get employee data', () => {
        service.getEmployeeData().subscribe(response => { });
        const req = httpMock.expectOne('http://localhost:8081/employee');
        expect(req.request.method).toBe('GET');
    });

    // Test Case 4
    it('should approve employee', () => {
        const id = '1';
        service.approveEmployee(id).subscribe(response => { });
        const req = httpMock.expectOne(`http://localhost:8081/employee/${id}/approved`);
        expect(req.request.method).toBe('PUT');
    });

    // Test Case 5
    it('should reject employee', () => {
        const id = '1';
        service.rejectEmployee(id).subscribe(response => { });
        const req = httpMock.expectOne(`http://localhost:8081/employee/${id}/rejected`);
        expect(req.request.method).toBe('PUT');
    });

});