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

@NgModule({
  declarations: [
    AppComponent,
    ThankYouComponent,
    HomeComponent,
    GetemployeeComponent,
    AuthenticationComponent,
    NotificationsComponent
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
      { path: 'authentication', component:AuthenticationComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
