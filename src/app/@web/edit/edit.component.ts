// --------------------------------------------------------------------------------------
// IMPORTACIÓN MODULOS
// --------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import { ActivatedRoute } from "@angular/router";

// --------------------------------------------------------------------------------------
// DEFINICIÓN COMPONENTE
// --------------------------------------------------------------------------------------
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

// --------------------------------------------------------------------------------------
// VARIABLE ENTORNO 
// --------------------------------------------------------------------------------------
  formRegistro: FormGroup;
  Usuario: Usuario;
  Usuarios: Usuario[];
  id: string;

// --------------------------------------------------------------------------------------
// CONSTRUTOR Y CICLO DE VIDA COMPONENTE
// --------------------------------------------------------------------------------------
  constructor(
    private _snackBar: MatSnackBar,
    private _userSerivice: UsuarioService,
    private _route: Router,
    private route: ActivatedRoute) { this.Usuarios = _userSerivice.usuarios; }


  ngOnInit(): void {
    // OBTENGO ID DE PARAMETRO
    this.id = this.route.snapshot.paramMap.get("ID");
    this.Usuario = this.Usuarios.find((item) => item.ID == this.id);
    this._validadorUsuario();

  }


// --------------------------------------------------------------------------------------
// FUNCIONES PRIVADAS _
// --------------------------------------------------------------------------------------

  private _validadorUsuario() {
    if (!this.Usuario) {
      this._snackBar.open(`No se encontro contacto con el ID ${this.id}.`, 'OK', { duration: 3800 });
      this._route.navigate(['list']);
    } else {
      this.formRegistro = this._createForm();
    }
  }

  _createForm() {
    return new FormGroup({
      ID: new FormControl({ value: this.Usuario.ID, disabled: true }, [Validators.required, Validators.minLength(9), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nombre: new FormControl(this.Usuario.nombre, [Validators.required, Validators.minLength(2)]),
      direccion: new FormControl(this.Usuario.direccion, [Validators.required, Validators.minLength(2)]),
      celular: new FormControl(this.Usuario.celular, [Validators.required, Validators.minLength(7), Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]),
      fecha: new FormControl({ value: new Date(this.Usuario.fecha), disabled: true }, [Validators.required, Validators.minLength(2)]),
    });
  }


// --------------------------------------------------------------------------------------
// FUNCIONES PUBLICAS
// --------------------------------------------------------------------------------------

  onSubmit(): void {

    let valores: Usuario = this.formRegistro.value;
    valores.fecha = this.formRegistro.get('fecha').value.toISOString();
    valores.ID = this.formRegistro.get('ID').value;
    valores.fechaCreacion = new Date().toLocaleString();

    // UBICO INDEX USUARIO (findIndex)
    let index = this.Usuarios.findIndex((item) => item.ID == this.id);
    this.Usuarios[index] = valores;
    
    this._userSerivice.usuario = this.Usuarios;
    this._snackBar.open(`El Usuario ${valores.nombre} fue actualizado correctamente.`, 'OK', { duration: 2800 });
    this._route.navigate(['list']);

  }

}
