import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = ['Mayores', 'Menores'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'doughnut';
  public lineChartPlugins = [];


  public Usuarios: Usuario[] = [];
  public UsuarioMayor: Usuario[] = [];

  constructor(private _service: UsuarioService) {
    this.Usuarios = this._service.usuarios;
    this.UsuarioMayor = this.Usuarios.filter((item) => {
      let temp = item.fecha.split('-');
      let old = new Date((Number(temp[2]) + 18), Number(temp[1]), Number(temp[0]))
      
      if (old < new Date())
        return item;
    });


    this.lineChartData = [{ data: [this.UsuarioMayor.length, (this.Usuarios.length - this.UsuarioMayor.length)]}]

  }

  ngOnInit() {
  }

}
