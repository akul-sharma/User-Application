import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { user } from '../models/user';
import { ConfirmValidator } from './comfirm.validator';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  formValue!:FormGroup;
  userData:user=new user();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      name:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      checkPassword:['',Validators.required],
      securityQuestion:['',Validators.required],
      securityAnswer:['',Validators.required]
    },{
      validator:ConfirmValidator('password','checkPassword')
    })
  }

  get f(){
    return this.formValue.controls;
  }

  postUser(){
    this.userData.userEmail=this.formValue.value.email;
    this.userData.userName=this.formValue.value.name;
    this.userData.userPassword=this.formValue.value.password;
    this.userData.securityQuestion=this.formValue.value.securityQuestion;
    this.userData.securityAnswer=this.formValue.value.securityAnswer;

    console.log(this.userData);

    this.http.post<any>('https://654e289dcbc32535574272c2.mockapi.io/users',this.userData)
    .subscribe((res)=>{
       console.log("Registered successfully",res);
       this.formValue.reset();
       alert('User Registered Successfully');
       this.router.navigate(['']);
    },
    (err)=>{
      console.error("Registration failed",err);
      alert("User Registration failed. PLease try again.")
    })
  }

}
