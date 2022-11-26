import { Injectable } from '@angular/core';
import {Client} from "../interfaces/client";
import {Observable} from "rxjs";
import {OptionListItem} from "../interfaces/option-list-item";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients: Client[] = [
    {id: 1, name: "John Doe", email: "jdoe25@gmail.com", address: "123 Any String, Any Town, NY", phone: "555-123-1234"},
    {id: 2, name: "James Denver", email: "james.denver@email.com", address: "452 State St, Little Town, PA", phone: "218-553-8375"},
    {id: 3, name: "Michelle Beanne", email: "mbeanne@gmail.com", address: "1975 Fake Blvd, Dallas, TX", phone: "825-347-8735"},
    {id: 4, name: "Heather Townsend", email: "heather@townsend.org", address: "1200 Internet Pkwy, Fort Worth, TX", phone: "357-734-3287"},
  ];
  private lastId: number = 4;

  constructor() { }

  getClients(): Observable<Client[]> {
    return new Observable<Client[]>((subscriber) => {
      subscriber.next(this.clients);
    });
  }

  getClientOptions(): Observable<OptionListItem[]> {
    let optionList: OptionListItem[] = [];
    this.clients.forEach(elem => {optionList.push({label: elem.name, value: elem.id})});

    return new Observable<OptionListItem[]>((subscriber) => {
      subscriber.next(optionList);
    });
  }

  getClient(id: number): Observable<Client> {
    const client: Client | undefined = this.clients.find(elem => elem.id === id);
    return new Observable<Client>((subscriber) => {
      subscriber.next(client == undefined ? {} as Client : client);
    });
  }

  upsertClient(client: Client): Observable<Client> {
    if(client.id != null) {
      const index: number = this.clients.findIndex(elem => elem.id === client.id);
      if(index != null) {
        this.clients[index] = client;
      } else {
        // shouldn't happen, but we will insert as new with provided id
        this.clients.push(client);
      }
    } else {
      this.lastId++;
      client.id = this.lastId;
      this.clients.push(client);
    }
    return new Observable<Client>((subscriber) => {
      subscriber.next(client);
    });
  }

  removeClient(id: number): Observable<void> {
    const index: number = this.clients.findIndex(elem => elem.id === id);
    if(index != undefined) {
      this.clients.splice(index, 1);
    }
    return new Observable<void>(observer => observer.complete());
  }

}
