// Running 9 Test Cases

import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let apiService: ApiService;
    let router: Router;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
            providers: [FormBuilder, ApiService]
        });

        fixture = TestBed.createComponent(HomeComponent);
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
    it('should navigate to employee data page', () => {
        spyOn(router, 'navigate').and.stub();
        component.getemployee();
        expect(router.navigate).toHaveBeenCalledWith(['/getEmployee']);
    });

     // Test Case 3
     it('should navigate to authentication page', () => {
        spyOn(router, 'navigate').and.stub();
        component.getNotifications();
        expect(router.navigate).toHaveBeenCalledWith(['/authentication']);
    });

    // Test Case 4
    it('should set attachment when a file is selected', () => {
        const file = new File([''], 'sample.txt', { type: 'text/plain' });
        const event = { target: { files: [file] } } as any;
        component.onFileSelect(event);
        expect(component.form.get('attachment')?.value).toBe(file);
    });

    // Test Case 5
    it('Should submit form for Sick Leave with valid file extension and All field filled', () => {

        const mockResponse = { success: true }; // Mocking a successful response

        spyOn(apiService, 'submitEmployeeData').and.returnValue(of(mockResponse));
        spyOn(window, 'alert');
        spyOn(router, 'navigate').and.stub();

        component.form.patchValue({
            name: 'John Doe',
            teamname: 'PlatformOps',
            leavefrom: '2023-09-08',
            leaveto: '2023-09-10',
            leavetype: 'Sick Leave',
            reporter: 'Chitransh Sharma',
            attachment: new File([''], 'sample.pdf', { type: 'application/pdf' })
        });

        component.onSubmit();

        expect(apiService.submitEmployeeData).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Applied For Sick Leave');
        expect(router.navigate).toHaveBeenCalledWith(['/thank-you']);
    });

    // Test Case 6
    it('Should not submit form if Sick Leave and file type is invalid', () => {
        spyOn(apiService, 'submitEmployeeData');
        spyOn(window, 'alert');
        spyOn(router, 'navigate').and.stub();
        component.form.patchValue({
            name: 'John Doe',
            teamname: 'PlatformOps',
            leavefrom: '2023-09-08',
            leaveto: '2023-09-10',
            leavetype: 'Sick Leave',
            reporter: 'Chitransh Sharma',
            attachment: new File([''], 'sample.docx', { type: 'application/docx' })
        });

        component.onSubmit();

        expect(apiService.submitEmployeeData).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Only PNG, PDF and TXT File Format Allowed');
        expect(router.navigate).not.toHaveBeenCalled();
    });

    // Test Case 7
    it('Should submit form if leave type is not Sick Leave and file is not attached', () => {
        const mockResponse = { success: true }; // Mocking a successful response

        spyOn(apiService, 'submitEmployeeData').and.returnValue(of(mockResponse));
        spyOn(window, 'alert');
        spyOn(router, 'navigate').and.stub();

        component.form.patchValue({
            name: 'John Doe',
            teamname: 'PlatformOps',
            leavefrom: '2023-09-08',
            leaveto: '2023-09-10',
            leavetype: 'Casual Leave',
            reporter: 'Chitransh Sharma',
            attachment: ''
        });

        component.onSubmit();

        expect(apiService.submitEmployeeData).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Applied For Casual Leave or Earned Leave');
        expect(router.navigate).toHaveBeenCalledWith(['/thank-you']);
    });

    // Test Case 8
    it('Should not submit form if leave type is not Sick Leave and file is attached', () => {
        const mockResponse = { success: true }; // Mocking a successful response

        spyOn(apiService, 'submitEmployeeData').and.returnValue(of(mockResponse));
        spyOn(window, 'alert');
        spyOn(router, 'navigate').and.stub();

        component.form.patchValue({
            name: 'John Doe',
            teamname: 'PlatformOps',
            leavefrom: '2023-09-08',
            leaveto: '2023-09-10',
            leavetype: 'Casual Leave',
            reporter: 'Chitransh Sharma',
            attachment: new File([''], 'sample.pdf', { type: 'application/pdf' })
        });

        component.onSubmit();

        expect(apiService.submitEmployeeData).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('NO NEED FOR ATTACHMENT');
        expect(router.navigate).not.toHaveBeenCalledWith(['/thank-you']);
    });

    // Test Case 9
    it('Should not submit form and provide alert if any other condition is used', () => {
        const mockResponse = { success: true }; // Mocking a successful response

        spyOn(apiService, 'submitEmployeeData').and.returnValue(of(mockResponse));
        spyOn(window, 'alert');
        spyOn(router, 'navigate').and.stub();

        component.form.patchValue({
            name: 'John Doe',
            teamname: 'PlatformOps',
            leavefrom: '2023-09-08',
            leaveto: '2023-09-10',
            leavetype: '',
            reporter: 'Chitransh Sharma',
            attachment: null
        });

        component.onSubmit();

        expect(apiService.submitEmployeeData).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith('Please fill all the fields');
        expect(router.navigate).not.toHaveBeenCalledWith(['/thank-you']);
    });

});
