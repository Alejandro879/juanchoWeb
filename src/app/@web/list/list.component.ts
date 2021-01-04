import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'ID', 'nombre', 'celular', 'direccion', 'fecha', 'edit', 'delete'];

  dataSource: Usuario[] = [];
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private _service: UsuarioService) {
    this.dataSource = _service.usuarios;
  }

  ngOnInit(): void {}


  dellUsuario(index) {
    if (confirm(`¿Seguro desea eliminar a ${this.dataSource[index].nombre} de su lista de contacto?`)) {
      this.dataSource.splice(index, 1)
      this._service.usuario = this.dataSource;
    }
    console.log(this.dataSource)
    this.table.renderRows();
    // splice
  }

}
