// Running 2 Test cases

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  // Test Case 1
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 2
  it(`should have as title 'my-app'`, () => {
    expect(component.title).toEqual('my-app');
  });

});
