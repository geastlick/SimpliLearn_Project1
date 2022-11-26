import { Component, OnInit } from '@angular/core';
import {ClientMeeting} from "../../../interfaces/client-meeting";
import {Subscription} from "rxjs";
import {ClientMeetingsService} from "../../../services/clientmeetings.service";
import {OptionListItem} from "../../../interfaces/option-list-item";
import {ClientsService} from "../../../services/clients.service";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ClientAddComponent} from "../../client/client-add/client-add.component";
import {ClientMeetingAddComponent} from "../client-meeting-add/client-meeting-add.component";

@Component({
  selector: 'app-client-meeting-list',
  templateUrl: './client-meeting-list.component.html',
  styleUrls: ['./client-meeting-list.component.css']
})
export class ClientMeetingListComponent implements OnInit {

  clientMeetings: ClientMeeting[] = [];
  clientMeetingSubscription: Subscription | null = null;
  loading: boolean = false;

  clientOptions: OptionListItem[] = [];
  clientOptionSubscription: Subscription | null = null;

  modalOptions: NgbModalOptions = {
    backdrop: 'static'
  };

  constructor(private clientMeetingService: ClientMeetingsService, private clientService: ClientsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loading = true;
    this.clientMeetingSubscription = this.clientMeetingService.getClientMeetings().subscribe((data: ClientMeeting[]) => {
      this.clientMeetings = data;
      this.loading = false;
    });
    this.clientOptionSubscription = this.clientService.getClientOptions().subscribe((data: OptionListItem[]) => {
      this.clientOptions = data;
    });
  }

  ngOnDestroy() {
    if(this.clientMeetingSubscription != null) {
      this.clientMeetingSubscription.unsubscribe();
    }
    if(this.clientOptionSubscription != null) {
      this.clientOptionSubscription.unsubscribe();
    }
  }

  getClientName(clientid: number): string {
    let client: OptionListItem | undefined = undefined;

    if(this.clientOptions) {
      client = this.clientOptions.find((obj) => {
        return obj.value === clientid;
      });
    }
    if(client != undefined) return client.label;
    return "";
  }

  createMeeting() {
    const modalRef = this.modalService.open(ClientMeetingAddComponent, this.modalOptions);
  }
  editMeeting(clientMeeting: ClientMeeting) {
    const modalRef = this.modalService.open(ClientMeetingAddComponent, this.modalOptions);
    modalRef.componentInstance.clientMeeting=clientMeeting;
  }

}
