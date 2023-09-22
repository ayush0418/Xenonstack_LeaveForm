import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private apiService: ApiService) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }
  
  getNotificatonAuth() {
    if (this.form.get('password')?.value == 'admin') {
      this.router.navigate(['/notifications'])
    }
    else {
      alert("Enter Valid Password")
    }
  }

  getForm(){
    this.router.navigate([''])
  }

  ngOnInit(): void { }
}
