// --------------------------------------------------------------------------------------
// IMPORTACIÓN MODULOS
// --------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';

// --------------------------------------------------------------------------------------
// DEFINICIÓN COMPONENTE
// --------------------------------------------------------------------------------------
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

// --------------------------------------------------------------------------------------
// VARIABLE ENTORNO 
// --------------------------------------------------------------------------------------
  Usuarios: Usuario[] = []
  UsuarioCumple: Usuario[] = [];
  UsuarioMayor: Usuario[] = [];
  tabla;


// --------------------------------------------------------------------------------------
// CONSTRUTOR Y CICLO DE VIDA COMPONENTE
// --------------------------------------------------------------------------------------
  constructor(private _service: UsuarioService) {
    this.Usuarios = this._service.usuarios;
    this.Usuarios = this.Usuarios.map( (item) => {item.fechaCreacion = new Date(item.fechaCreacion); return item} );
    this.Usuarios = this.Usuarios.sort( (a,b) => { return  Math.abs(new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())});


    this.UsuarioCumple  = this._cumpleGet();
    this.UsuarioMayor   = this._mayorGet();

  }

  ngOnInit(): void {}


// --------------------------------------------------------------------------------------
// FUNCIONES PRIVADAS _
// --------------------------------------------------------------------------------------
  _mayorGet(): Usuario[]  {
  	return this.Usuarios.filter((item) => {
      let temp = new Date(item.fecha);
      temp.setFullYear(temp.getFullYear() + 18);
      if (temp < new Date())
        return item;
    });
  }


  _cumpleGet(): Usuario[] {
      return this.Usuarios.filter((item) => {
        let hoy = new Date();
        let diaCumple = new Date(item.fecha);
        if ((hoy.getDate() == diaCumple.getDate()) && (hoy.getMonth() === diaCumple.getMonth())){return item};
      });
  }

}
