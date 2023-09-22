// Running 5 Test Cases
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsComponent } from './notifications.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('NotificationsComponent', () => {

  let apiService: ApiService;
  let router: Router;
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FormBuilder, ApiService]
    });
    fixture = TestBed.createComponent(NotificationsComponent);
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
  it('Should get all the notifications Data', () => {
    const mockResponse = { success: true };

    spyOn(apiService, 'getNotificationData').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(apiService.getNotificationData).toHaveBeenCalled();
  });

  // Test Case 4
  it('Should Aprove on clicking Approve and Display new Data', () => {
    const id = '1'
    const mockResponse = { success: true };

    spyOn(apiService, 'approveEmployee').and.returnValue(of(id));
    spyOn(apiService, 'getNotificationData').and.returnValue(of(mockResponse));
    component.onApprove(id);
    expect(apiService.approveEmployee).toHaveBeenCalled();
    expect(apiService.getNotificationData).toHaveBeenCalled();
  });

  // Test Case 5
  it('Should Reject on clicking Reject and Display new Data', () => {
    const id = '1'
    const mockResponse = { success: true };

    spyOn(apiService, 'rejectEmployee').and.returnValue(of(id));
    spyOn(apiService, 'getNotificationData').and.returnValue(of(mockResponse));
    component.onReject(id);
    expect(apiService.rejectEmployee).toHaveBeenCalled();
    expect(apiService.getNotificationData).toHaveBeenCalled();
  });
});
