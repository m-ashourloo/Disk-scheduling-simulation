import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent} from './user/user.component';
import {ChooseComponent} from './choose/choose.component';
import {RandomComponent} from './random/random.component';

const routes: Routes = [
  {path: '', component: ChooseComponent},
  {path: 'UserInput', component: UserComponent},
  {path: 'RandomInput', component: RandomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
