import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../Services/users-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  userForm: FormGroup;
  users: any[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    })
  }

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.userForm = this.fb.group({
      _id: null,
      name: ['', [Validators.required]],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    })
  }


  onUserFormSubmit() {
    const userData: any = {
      _id: this.userForm.get('_id')?.value!,
      name: this.userForm.get('name')?.value!,
      title: this.userForm.get('title')?.value!,
      email: this.userForm.get('email')?.value!,
      role: this.userForm.get('role')?.value!,
    }

    if(this.userForm.valid){
      if(!userData._id) {
        this.userService.addUser(userData).subscribe({
          next: (res)=>{
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
          }})
      }else{
        this.userService.updateUser(userData).subscribe({
          next: (res)=>{
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
          }})
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onDeleteUser(id: string)
  {
    this.userService.deleteUser(id).subscribe({
      next: (res)=>{
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  onEditUser(id:string, openModalBtn: HTMLElement){

    openModalBtn.click();

    let user:any =this.users.find((user) => user._id === id);

    this.userForm.patchValue({
      _id: user._id,
      name: user.name,
      title: user.title,
      email: user.email,
      role: user.role
    })
  }
}
