import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { component } from 'vue/types/umd';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
