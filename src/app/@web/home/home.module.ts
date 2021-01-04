import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { GraphComponent } from './graph/graph.component';


@NgModule({
  declarations: [HomeComponent, GraphComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HomeModule { }
