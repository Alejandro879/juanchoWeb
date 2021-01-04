import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _usuario: Usuario[] = [];
  constructor() {
    if (!localStorage.getItem('juancho-User')) localStorage.setItem('juancho-User', "[]");
    this._usuario = JSON.parse(localStorage.getItem('juancho-User'));

}

  get  usuarios() : Usuario[] {
  		this._usuario = JSON.parse(localStorage.getItem('juancho-User'));
  		return this._usuario;
  }

  set usuario(usuario) {

  	this._usuario = usuario;
  	localStorage.setItem('juancho-User', JSON.stringify(this._usuario));
  }


  addUsuario(usuario){
  	this._usuario.push(usuario);
  	localStorage.setItem('juancho-User', JSON.stringify(this._usuario));
  }
}
