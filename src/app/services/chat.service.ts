import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ImessagesSerialization } from '../models/imessages-serialization';
import { Observable } from 'rxjs';
import { IchatSerialization } from '../models/ichat-serialization';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  _url: string = 'http://localhost:3000/'
  private socket: Socket;

  constructor(private _http: HttpClient) {
    this.socket = io(this._url);
  }

  init_chat(id_user_1: number, id_user_2: number): Observable<any>{
    return this._http.post<any>(this._url + "chat/init", {id_user_1, id_user_2});
  }

  get_chats(id_user: number): Observable<IchatSerialization[]>{
    return this._http.get<IchatSerialization[]>(this._url + "chat/get_by_user/" + id_user);
  }

  join(id_chat: string, id_user: number){
    this.socket.emit('join_chat', id_chat, id_user);
  }

  send_message(id_chat: string, message: ImessagesSerialization){
    this.socket.emit('send_new_message', id_chat, message);
  }

  on_new_message(callback: (message: ImessagesSerialization) => void){
    this.socket.on('new_message', callback);
  }

  load_messages(id_chat: string, callback: (message: ImessagesSerialization[]) => void){
    this.socket.emit('load_messages', id_chat);
    this.socket.on('get_messages', callback);
  }

  edit_message(id_chat: string, message: ImessagesSerialization){
    this.socket.emit('edit_messages', id_chat, message);
  }

  on_edited_message(callback: (message: ImessagesSerialization) => void){
    this.socket.on('edited_message', callback);
  }

  delete_message(id_chat: string, id_message: string){
    this.socket.emit('delete_message', id_chat, id_message);
  }

  on_deleted_message(callback: (id_message: string) => void){
    this.socket.on('deleted_message', callback);
  }
}
