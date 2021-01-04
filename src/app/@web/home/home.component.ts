import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Usuarios: Usuario[] = []
  UsuarioCumple: Usuario[] = [];
  UsuarioMayor: Usuario[] = [];
  tabla;

  constructor(private _service: UsuarioService) {
    this.Usuarios = this._service.usuarios;
    this.Usuarios = this.Usuarios.map( (item) => {item.fechaCreacion = new Date(item.fechaCreacion); return item} );
    this.Usuarios = this.Usuarios.sort( (a,b) => { return  Math.abs(new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())});
    this.UsuarioCumple = this.Usuarios.filter((item) => { let hoy = new Date().toLocaleDateString(); if (item.fecha === hoy) { return item } });

    this.UsuarioMayor = this.mayorGet();


    console.log(this.UsuarioMayor)

  }

  ngOnInit(): void {


  }

  mayorGet(): Usuario[]  {
  	return this.Usuarios.filter((item) => {
      let temp = item.fecha.split('-');
      let old = new Date((Number(temp[2]) + 18), Number(temp[1]), Number(temp[0]))
      
      if (old < new Date())
        return item;
    });
  }

}
