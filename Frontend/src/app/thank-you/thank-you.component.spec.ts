//Running 3 Test Cases

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThankYouComponent } from './thank-you.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankYouComponent],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Test Case 1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 2
  it('should render Message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Your Request for Leave is Submitted Successfully!');
  });

  // Test Case 3
  it('should navigate to home page', () => {
    spyOn(router, 'navigate').and.stub();
    component.getForm();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

});