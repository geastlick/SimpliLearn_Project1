import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientMeetingListComponent } from './client-meeting-list/client-meeting-list.component';
import { ClientMeetingAddComponent } from './client-meeting-add/client-meeting-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
    declarations: [
        ClientMeetingListComponent,
        ClientMeetingAddComponent
    ],
    exports: [
        ClientMeetingListComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule
  ]
})
export class ClientmeetingModule { }
