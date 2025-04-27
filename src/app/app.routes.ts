import { Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { MenuComponent } from './views/menu/menu.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'store', component: StoreComponent },
  { path: '**', redirectTo: '' }
];
