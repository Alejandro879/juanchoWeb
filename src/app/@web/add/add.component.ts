// --------------------------------------------------------------------------------------
// IMPORTACIÓN MODULOS
// --------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../usuario.service'
import { Usuario } from '../usuario'

// --------------------------------------------------------------------------------------
// DEFINICIÓN COMPONENTE
// --------------------------------------------------------------------------------------
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

// --------------------------------------------------------------------------------------
// VARIABLE ENTORNO 
// --------------------------------------------------------------------------------------
  formRegistro: FormGroup;

  // --------------------------------------------------------------------------------------
// CONSTRUTOR Y CICLO DE VIDA COMPONENTE
// --------------------------------------------------------------------------------------
  constructor(
    private _snackBar: MatSnackBar, 
    private _userSerivice: UsuarioService, 
    private route: Router) {
    this.formRegistro = new FormGroup({
      ID: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(2)]),
      celular: new FormControl('', [Validators.required, Validators.minLength(7), Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]),
      fecha: new FormControl({ value: new Date(), disabled: true }, [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnInit(): void {
    console.log(this._userSerivice.usuarios);
  }



// --------------------------------------------------------------------------------------
// FUNCIONES PRIVADAS _
// --------------------------------------------------------------------------------------
  onSubmit(): void {

    let valores: Usuario = this.formRegistro.value;
    valores.fecha = this.formRegistro.get('fecha').value.toISOString();
    valores.fechaCreacion = new Date().toLocaleString();


    let index = this._userSerivice.usuarios.findIndex((item) => item.ID == valores.ID);

    if (index >= 0) {
        this._snackBar.open("El ID del contacto ya existe.", 'OK', { duration: 4800 });
        this.route.navigate(['list']);
    } else {
      this._userSerivice.addUsuario(valores);
      this._snackBar.open("Usuario agregado correctamente.", 'OK', { duration: 1800 });
      this.route.navigate(['list']);
    }



  }
}
