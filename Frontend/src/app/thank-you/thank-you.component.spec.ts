//Running 3 Test Cases

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThankYouComponent } from './thank-you.component';

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test Case 1
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 2
  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('THANK YOU');
  });

  // Test Case 3
  it('should render message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('thank-you works!');
  });

});