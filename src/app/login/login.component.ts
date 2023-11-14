import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formValue!:FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  login(){
    this.http.get<any>('https://654e289dcbc32535574272c2.mockapi.io/users')
    .subscribe(res=>{
      const credentials=res.find((user:any)=>{
         return user.userEmail===this.formValue.value.email && user.userPassword===this.formValue.value.password;
      })
      if(credentials){
        localStorage.setItem("username",credentials.userName);
        console.log("Login successful");
        this.router.navigate(['Dashboard/Home']);
      }else{
        console.log("Login failed");
        alert("Invalid email or password");
        this.formValue.reset();
      }
    },
    (err)=>{
      console.log(err);
    })
  }
 

}
