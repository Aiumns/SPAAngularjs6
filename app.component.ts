import { AuthenticationService } from './Services/authentication.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit} from '@angular/core';
import {RequestOptions, Request, Headers } from '@angular/http';
import { FormBuilder, FormGroup , Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Registration } from './Models/User.Models';
import { RegistrationService } from './Services/Registration.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RegistrationService]
})

export class AppComponent implements OnInit {
  isLoggedIn = false;
  closeResult: string;
  authService: AuthenticationService;
  registrationForm: FormGroup;
  loginForm: FormGroup;
  registrationInputs: Registration[];
  @Input()
  public alerts: Array<IAlert> = [];
  message = '';
  public globalResponse: any;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private regService: RegistrationService) {
  }
  ngOnInit() {
        this.registrationForm = this.fb.group({
          UserName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
          Password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
          Email: ['', Validators.compose([Validators.required, Validators.email])],
          Role: ['', Validators.compose([Validators.required])],
          Phone: ['', Validators.compose([Validators.required])],
          Gender: ['' , ''],
        });

        this.loginForm = this.fb.group({
          Username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
          Password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
        });
  }

  Open(context) {
        this.modalService.open(context, {ariaLabelledBy: 'madal-basic-title' , size: 'lg'}).result.then((result) => {
             this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed: ${this.getDismissReason(reason)}`;
        });
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
       } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
       } else {
          return 'with: ${reason}';
     }
  }

  Login() {
      let user = this.loginForm.value;
      this.isLoggedIn = false;
      this.authService.removeToken();
      this.alerts = [];
      console.log(user);
      this.authService.ValidateUser(user).subscribe (

	       (result) => {
	        this.globalResponse = result;
			},

			error => {
			     console.log(error.message);
				 this.alerts.push(
				       {
					     id: 2,
						  type: 'danger',
						  message: 'Either user name Or password is incorrect'
					   });
            },
      () => {
                     //THIS IS Success part
			   console.log(this.globalResponse);
			   this.authService.storeToken(this.globalResponse.access_token);
			   this.alerts.push(
				       {
					     id: 1,
						  type: 'success',
						  message: 'Login successful.Now You can close and proceed further'
					   });
					   this.isLoggedIn = true;
			     })
       }

OnRegister() {
      this.registrationInputs = this.registrationForm.value;
      console.log(this.registrationInputs);
        this.regService.RegisterUser(this.registrationInputs)
             .subscribe((result) => {
               this.globalResponse = result;
        },
        error => {
           this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Registration Failed with following error2222 :' + error,
              });
      },

      () => {
            //  this is succes alert
            this.alerts.push({
                 id: 1,
                 type: 'success',
                 message: 'Registration successful.',
            });
       }
    );
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  LogOut() {
     this.isLoggedIn = false;
     this.authService.removeToken();
  }
}

export interface IAlert {
      id: number;
      type: string;
      message: string;
}
