import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { GetemployeeComponent } from './getemployee/getemployee.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DashboardComponent } from './dashboard/DashboardComponent';
import { KpiComponent } from './kpi/kpi.component';

@NgModule({
  declarations: [
    AppComponent,
    ThankYouComponent,
    HomeComponent,
    GetemployeeComponent,
    AuthenticationComponent,
    NotificationsComponent,
    DashboardComponent,
    KpiComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'thank-you', component: ThankYouComponent },
      { path: '', component: HomeComponent },
      { path: 'getEmployee', component: GetemployeeComponent },
      { path: 'notifications', component:NotificationsComponent },
      { path: 'authentication', component:AuthenticationComponent },
      { path: 'dashboard', component:DashboardComponent },
      { path: 'kpi', component:KpiComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
