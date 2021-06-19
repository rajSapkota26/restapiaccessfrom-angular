import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService, private snack: MatSnackBar, private router: Router) { }
  public loginData = {
    username: '',
    password: ''
  };
  ngOnInit(): void {
  }
  userLogin() {
    // console.log(this.loginData);
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("username is required", '', {
        duration: 3000,
        // verticalPosition: 'top'
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("password is required", '', {
        duration: 3000,
        // verticalPosition: 'top'
      });
      return;
    }

    //send request to server to generate token
    this.service.generatetoken(this.loginData).subscribe(
      (data: any) => {
        Swal.fire(
          'Success',
          'login successfully!',
          'success'
        )
        //save token
        this.service.loginUser(data.token);
        //login use send redirect accorfing to role
        this.service.getCurrentUser().subscribe(
          (user: any) => {
            this.service.saveUser(user);
            //redirect
            let roleStr = this.service.getUserRole();
            if (roleStr == "ADMIN") {
              //admin dashboard
              console.log(user);
              this.router.navigate(['admindashboard']);
            } else if (roleStr == "USER") {
              //user dashboard
              console.log(user);
              this.router.navigate(['user-dashboard']);
            } else {
              this.service.logOutUser();
            }

          },
          (error) => {
            Swal.fire(
              'Error',
              'Invalid details !! try again',
              'error'
            )
          }
        );
      }, (error) => {
        Swal.fire(
          'Error',
          'Something went wrong!!',
          'error'
        )
        console.log(error);
      }
    );
  }

}
