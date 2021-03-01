import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/+auth/services/auth.service';
import { Path } from '@core/structs';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') ||
      `/${Path.App}`;
  }

  public get loginFormGroup() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
  }


  public hasError(formControlName, errorCode: string) {
    return this.loginFormGroup[formControlName].hasError(errorCode);
  }


  public createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
  }

  public onClickSignIn(): void {
    this.authService.signIn();
    this.router.navigate([this.returnUrl]);
  }
}
