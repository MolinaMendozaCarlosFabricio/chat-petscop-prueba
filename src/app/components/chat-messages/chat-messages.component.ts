import { Component, Input, OnInit } from '@angular/core';
import { ImessagesSerialization } from '../../models/imessages-serialization';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent implements OnInit{
  @Input() id_chat: string = "";
  @Input() id_user: number = 0;
  messages: ImessagesSerialization[] = [];
  body: string = "";
  edit_body: string = "";

  constructor(private chatServices: ChatService){}

  ngOnInit(): void {
    console.log("Iniciando chat");
      this.chatServices.join(this.id_chat, this.id_user);
      this.chatServices.load_messages(this.id_chat, (messages) => {this.messages = messages});

      this.chatServices.on_new_message((message) => {
        this.messages.push(message);
      })

      this.chatServices.on_edited_message((message) => {
        for(let i: number = 0; i < this.messages.length; i++){
          if(this.messages[i]._id === message._id){
            this.messages[i] = message;
            i = this.messages.length + 10;
          }
        }
      })

      this.chatServices.on_deleted_message((id_message) => {
        for(let i: number = 0; i < this.messages.length; i++){
          if(this.messages[i]._id === id_message){
            this.messages.splice(i, 1);
            i = this.messages.length + 10;
          }
        }
      });
  }

  sendMessage(){
    const new_message: ImessagesSerialization = {
      _id: "",
      id_user: this.id_user,
      body_message: this.body,
    }
    this.chatServices.send_message(this.id_chat, new_message)
    this.body = "";
  }

  editMessage(objMsg: ImessagesSerialization){
    objMsg.body_message = this.edit_body;
    this.chatServices.edit_message(this.id_chat, objMsg);
    this.edit_body = "";
  }

  deleteMessage(id_message: string){
    this.chatServices.delete_message(this.id_chat, id_message);
  }
}
