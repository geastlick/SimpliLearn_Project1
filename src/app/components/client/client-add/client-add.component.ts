import {Component, Input, OnInit} from '@angular/core';
import {Client} from "../../../interfaces/client";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../../services/clients.service";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  @Input() client: Client = {} as Client;

  clientForm: FormGroup = new FormGroup('');

  constructor(private clientService: ClientsService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      name: new FormControl(this.client.name, Validators.required),
      email: new FormControl(this.client.email, [Validators.required, Validators.email]),
      address: new FormControl(this.client.address, Validators.required),
      phone: new FormControl(this.client.phone, [
        Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
        Validators.minLength(12),
        Validators.required
      ])
    });
  }

  onSubmit() {
    this.clientService.upsertClient({
      id: this.client.id,
      name: this.clientForm.controls['name'].value,
      email: this.clientForm.controls['email'].value,
      address: this.clientForm.controls['address'].value,
      phone: this.clientForm.controls['phone'].value
    }).subscribe(data => console.log(data));
    this.activeModal.close();
  }

  isInvalid(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

}

