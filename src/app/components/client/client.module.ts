import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientAddComponent } from './client-add/client-add.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        ClientListComponent,
        ClientAddComponent
    ],
    exports: [
        ClientListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class ClientModule { }
