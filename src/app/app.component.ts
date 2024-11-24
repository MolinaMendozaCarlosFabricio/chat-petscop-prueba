import { Component, OnInit } from '@angular/core';
import { IchatSerialization } from './models/ichat-serialization';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  user_id: number = 19;
  selected_user: number = 0;
  open_list: boolean = false;

  open_chat_list(){
    this.selected_user = this.user_id;
    this.open_list = true;
  }
}
