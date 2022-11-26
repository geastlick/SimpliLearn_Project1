import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ClientMeetingListComponent} from "./components/clientmeeting/client-meeting-list/client-meeting-list.component";
import {ClientListComponent} from "./components/client/client-list/client-list.component";

const routes: Routes = [
  { path: 'clients', component: ClientListComponent },
  { path: 'meetings', component: ClientMeetingListComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
