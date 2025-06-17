import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SignupRequest } from '../models/user/SignupRequest';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
    newUser: SignupRequest = {
    username: '',
    email: '',
    password: '',
    role: ['user'] // o vacío si no quieres roles asignados aquí
  };

  message: string = '';

  constructor(private userService: UserService) {}

  register(): void {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.message = 'Usuario creado con éxito. ¡Ya puedes iniciar sesión!';
      },
      error: err => {
        console.error('Error al crear usuario', err);
        this.message = 'Error al crear el usuario. Intenta de nuevo.';
      }
    });
  }
}