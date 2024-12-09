import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataSaved = false;
  userForm!: FormGroup;
  allUsers: User[] = [];
  userIdUpdate: number | null = null;
  message = "";
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private routes: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
    this.loadAllUsers();
  }

  //loadAllUsers() {
  //  this.userService.getAllUsers().subscribe(
  //    (data: User[]) => {
  //      console.log('Users Data:', data); // Debugging
  //      this.allUsers = data;
  //    },
  //    (error) => {
  //      this.errorMessage = error;
  //      this.allUsers = [];
  //    }
  //  );
  //}
  loadAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        console.log('Loaded Users:', data);
        this.allUsers = data;
      },
      (error) => {
        console.error('Error loading users:', error);
        this.errorMessage = error;
        this.allUsers = [];
      }
    );
  }
  onFormSubmit() {
    this.dataSaved = false;
    const user = this.userForm.value as User;
    if (this.userIdUpdate == null) {
      this.createUser(user);
    } else {
      this.updateUser(user);
    }
    this.userForm.reset();
  }

  loadUserToEdit(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        this.message = "";
        this.dataSaved = false;
        this.userIdUpdate = user.userId;
        this.userForm.patchValue(user);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe(
      () => {
        this.dataSaved = true;
        this.message = "User created successfully.";
        this.loadAllUsers();
        this.userIdUpdate = null;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  updateUser(user: User) {
    if (this.userIdUpdate != null) {
      this.userService.updateUser(this.userIdUpdate, user).subscribe(
        () => {
          this.dataSaved = true;
          this.message = "User updated successfully.";
          this.loadAllUsers();
          this.userIdUpdate = null;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  deleteUser(userId: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUserById(userId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = "User deleted successfully.";
          this.loadAllUsers();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  resetForm() {
    this.userForm.reset();
    this.message = "";
    this.errorMessage = "";
    this.dataSaved = false;
  }
}
