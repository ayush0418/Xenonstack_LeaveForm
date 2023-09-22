import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private apiService: ApiService) {
    this.form = this.formBuilder.group({

      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      teamname: ['', [Validators.required]],
      leavefrom: ['', [Validators.required]],
      leaveto: ['', [Validators.required]],
      leavetype: ['', [Validators.required]],
      reporter: ['', [Validators.required]],
      attachment: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  getemployee() {
    this.router.navigate(['/getEmployee'])
  }
  getNotifications() {
    this.router.navigate(['/authentication'])
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('attachment')?.setValue(file);
    }
  }

  onSubmit() {

    const name = this.form.get('name')?.value;
    const nameLength = name ? name.length : 0;
    const teamname = this.form.get('teamname')?.value;
    const leavefrom = this.form.get('leavefrom')?.value!;
    const leaveto = this.form.get('leaveto')?.value!;
    const leaveType = this.form.get('leavetype')?.value!;
    const reporter = this.form.get('reporter')?.value!;
    const attachment = this.form.get('attachment')?.value!;

    // Prepare the form data
    const formData = new FormData();

    formData.append('emp_name', this.form.get('name')?.value);
    formData.append('team_name', this.form.get('teamname')?.value);
    formData.append('leave_from', this.form.get('leavefrom')?.value);
    formData.append('leave_to', this.form.get('leaveto')?.value);
    formData.append('leave_type', this.form.get('leavetype')?.value);
    formData.append('reporter', this.form.get('reporter')?.value);
    formData.append('attachment', this.form.get('attachment')?.value);

    const ext = attachment ? attachment.name.split('.').pop() : null;
    if ((this.form.get('name')?.invalid) || (nameLength < 3 || nameLength > 50) || (this.form.get('leaveto')?.value < this.form.get('leavefrom')?.value)) {
      alert("Enter the Vaild Name or Date")
    }
    else if (this.form.valid && leaveType == 'Sick Leave' && (ext == 'pdf' || ext == "png" || ext == "txt")) {
      // Send the API request
      this.apiService.submitEmployeeData(formData).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );

      console.log("Applied For Sick Leave")
      alert("Applied For Sick Leave");
      this.router.navigate(['/thank-you']);
    }
    else if (this.form.valid && leaveType == 'Sick Leave' && (ext != 'pdf' || ext != "png" || ext != "txt")) {
      console.log("Only Png, Pdf and txt file allowed")
      alert("Only PNG, PDF and TXT File Format Allowed");
    }
    else if (name != '' && teamname != '' && leavefrom != '' && leaveto != '' && leaveType != '' && leaveType != 'Sick Leave' && reporter != '' && attachment == '') {
      // Send the API request
      this.apiService.submitEmployeeData(formData).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );

      console.log("Applied For Casual Leave or Earned Leave")
      alert("Applied For Casual Leave or Earned Leave")
      this.router.navigate(['/thank-you']);
    }
    else if (name != '' && teamname != '' && leavefrom != '' && leaveto != '' && leaveType != '' && leaveType != 'Sick Leave' && reporter != '' && attachment != '') {
      console.log("You are applying for Casual or Earned Leave. No need for attachmnet")
      alert("NO NEED FOR ATTACHMENT")
    }
    else {
      console.log("Please fill all the fields")
      alert("Please fill all the fields")
    }
  }
}