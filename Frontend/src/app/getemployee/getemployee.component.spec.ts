//Running 3 Test Cases

import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { GetemployeeComponent } from './getemployee.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('GetemployeeComponent', () => {
    let component: GetemployeeComponent;
    let fixture: ComponentFixture<GetemployeeComponent>;
    let apiService: ApiService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GetemployeeComponent],
            imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
            providers: [FormBuilder, ApiService]
        });
        fixture = TestBed.createComponent(GetemployeeComponent);
        component = fixture.componentInstance;
        apiService = TestBed.inject(ApiService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    // Test Case 1
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Test Case 2
    it('Should Navigate to Home page', () => {
        spyOn(router, 'navigate').and.stub();
        component.getform();
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    // Test Case 3
    it('Should get all the employee Data', () => {
        const mockResponse = { success: true };

        spyOn(apiService, 'getEmployeeData').and.returnValue(of(mockResponse));
        component.ngOnInit();
        expect(apiService.getEmployeeData).toHaveBeenCalled();
    });

});
