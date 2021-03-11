// --------------------------------------------------------------------------------------
// IMPORTACIÓN MODULOS
// --------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../usuario';

// --------------------------------------------------------------------------------------
// DEFINICIÓN COMPONENTE
// --------------------------------------------------------------------------------------
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

// --------------------------------------------------------------------------------------
// VARIABLE ENTORNO 
// --------------------------------------------------------------------------------------
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[]       = ['Mayores', 'Menores'];
  public lineChartOptions: ChartOptions = { responsive: true, };
  public lineChartColors: Color[]       = [{ borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)', }, ];
  public lineChartLegend                = true;
  public lineChartType: ChartType       = 'doughnut';
  public lineChartPlugins               = [];
  public Usuarios: Usuario[]            = [];
  public UsuarioMayor: Usuario[]        = [];

// --------------------------------------------------------------------------------------
// CONSTRUTOR Y CICLO DE VIDA COMPONENTE
// --------------------------------------------------------------------------------------
  constructor(private _service: UsuarioService) {
    this.Usuarios = this._service.usuarios;
    this.UsuarioMayor = this._mayorGet();
    this.lineChartData = [{ data: [this.UsuarioMayor.length, (this.Usuarios.length - this.UsuarioMayor.length)] }]

  }

  ngOnInit() {}


// --------------------------------------------------------------------------------------
// FUNCIONES PRIVADAS _
// --------------------------------------------------------------------------------------
_mayorGet(): Usuario[] {
    return this.Usuarios.filter((item) => {
      let temp = new Date(item.fecha);
      temp.setFullYear(temp.getFullYear() + 18);
      if (temp < new Date())
        return item;
    });
  }

}
