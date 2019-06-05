import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', Validators.required);
  senha = new FormControl('', Validators.required)

  constructor(private authenticationService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    this.authenticationService.clearAuthentication();
  }

  private createForm(): void {
  }

  login() {

    let usuario: string = this.email.value;
    let senha: string = this.senha.value;
    
    this.authenticationService.authenticate(usuario, senha).subscribe(
      result => {
        this.router.navigate(["private"]);
      }, error => {
        this.router.navigate(["public"]);
      }
    );
  }

}
