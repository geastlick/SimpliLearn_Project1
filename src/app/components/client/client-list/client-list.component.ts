import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../../../services/clients.service";
import {Client} from "../../../interfaces/client";
import {Subscription} from "rxjs";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ClientAddComponent} from "../client-add/client-add.component";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  clientSubscription: Subscription | null = null;
  loading: boolean = false;

  modalOptions: NgbModalOptions = {
    backdrop: 'static'
  };

  constructor(private clientService: ClientsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loading = true;
    this.clientSubscription = this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if(this.clientSubscription != null) {
      this.clientSubscription.unsubscribe();
    }
  }

  createClient() {
    const modalRef = this.modalService.open(ClientAddComponent, this.modalOptions);
  }
  editClient(client: Client) {
    const modalRef = this.modalService.open(ClientAddComponent, this.modalOptions);
    modalRef.componentInstance.client=client;
  }

}
