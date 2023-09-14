// Running 4 Test Cases
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AuthenticationComponent', () => {

    let component: AuthenticationComponent;
    let fixture: ComponentFixture<AuthenticationComponent>;
    let apiService: ApiService;
    let router: Router;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [AuthenticationComponent],
            imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
            providers: [FormBuilder, ApiService]
        });

        fixture = TestBed.createComponent(AuthenticationComponent);
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
    it('should navigate to get employee if valid password', () => {
        spyOn(router, 'navigate').and.stub();

        component.form.patchValue({
            password: 'admin'
        });
        component.getemployeeauth();

        expect(router.navigate).toHaveBeenCalledWith(['/getEmployee']);
    })

    // Test Case 3
    it('should not navigate to get employee if notvalid password', () => {
        spyOn(router, 'navigate').and.stub();
        spyOn(window, 'alert');

        component.form.patchValue({
            password: 'admin123'
        });
        component.getemployeeauth();

        expect(router.navigate).not.toHaveBeenCalledWith(['/getEmployee']);
        expect(window.alert).toHaveBeenCalledWith('Enter Valid Password');
    })

    // Test Case 4
    it('should Navigate to Home page', () => {
        spyOn(router, 'navigate').and.stub();
        component.getForm();
        expect(router.navigate).toHaveBeenCalledWith(['']);
    })
});
