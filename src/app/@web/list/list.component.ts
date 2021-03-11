// --------------------------------------------------------------------------------------
// IMPORTACIÓN MODULOS
// --------------------------------------------------------------------------------------
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario'

// --------------------------------------------------------------------------------------
// DEFINICIÓN COMPONENTE
// --------------------------------------------------------------------------------------
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // --------------------------------------------------------------------------------------
  // VARIABLE ENTORNO 
  // --------------------------------------------------------------------------------------
  displayedColumns: string[] = ['position', 'ID', 'nombre', 'celular', 'direccion', 'fecha', 'edit', 'delete'];
  dataSource: Usuario[] = [];
  @ViewChild(MatTable) table: MatTable < any > ;

  // --------------------------------------------------------------------------------------
  // CONSTRUTOR Y CICLO DE VIDA COMPONENTE
  // --------------------------------------------------------------------------------------
  constructor(private _service: UsuarioService) {
    this.dataSource = _service.usuarios;
  }

  ngOnInit(): void {}

  // --------------------------------------------------------------------------------------
  // FUNCIONES PRIVADAS _
  // --------------------------------------------------------------------------------------
  dellUsuario(index) {
    if (confirm(`¿Seguro desea eliminar a ${this.dataSource[index].nombre} de su lista de contacto?`)) {
      this.dataSource.splice(index, 1)
      this._service.usuario = this.dataSource;
    }
    this.table.renderRows();
    // splice
  }


  _isCumple(item: Usuario) {
    let hoy = new Date();
    let diaCumple = new Date(item.fecha);
   return ((hoy.getDate() == diaCumple.getDate()) && (hoy.getMonth() === diaCumple.getMonth())) ? true : false;
  }

}
