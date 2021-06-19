import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private servixe: UserService, private snack: MatSnackBar) { }
  public User = {
    userName: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: ''

  };

  ngOnInit(): void {
  }
  formSubmit() {
    if (this.User.userName == '' || this.User.userName == null) {
      this.snack.open("username is required", '', {
        duration: 3000,
        // verticalPosition: 'top'
      });
      return
    }
    //adding user to backend
    this.servixe.addUser(this.User).subscribe(
      (data) => {
        Swal.fire(
          'Success',
          'user is registered successfully!',
          'success'
        )
        console.log(data);
      },
      (error) => {
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
