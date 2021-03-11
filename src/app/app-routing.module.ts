import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    'path': '',
    loadChildren: () => import('./@web/home/home.module').then(m => m.HomeModule)
  },
  {
    'path': 'list',
    loadChildren: () => import('./@web/list/list.module').then(m => m.ListModule)
  },
  {
    'path': 'add',
    loadChildren: () => import('./@web/add/add.module').then(m => m.AddModule)
  },
  {
    'path': 'edit/:ID',
    loadChildren: () => import('./@web/edit/edit.module').then(m => m.EditModule)
  },
  {
    'path': 'juanchoWeb',
    loadChildren: () => import('./@web/home/home.module').then(m => m.HomeModule)
  },
  {
    'path': 'juanchoWeb/list',
    loadChildren: () => import('./@web/list/list.module').then(m => m.ListModule)
  },
  {
    'path': 'juanchoWeb/add',
    loadChildren: () => import('./@web/add/add.module').then(m => m.AddModule)
  },
  {
    'path': 'juanchoWeb/edit/:ID',
    loadChildren: () => import('./@web/edit/edit.module').then(m => m.EditModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
