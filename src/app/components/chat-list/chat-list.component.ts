import { Component, Input } from '@angular/core';
import { IchatSerialization } from '../../models/ichat-serialization';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent {
  chats: IchatSerialization[] = [];
  @Input() user_id: number = 19;
  chat_selected: string = "";
  open_chat: boolean = false

  constructor(private chatServices: ChatService) {  }


  ngOnInit(): void {
    this.chatServices.get_chats(this.user_id).subscribe(
      (response) => {
        this.chats = response;
      },
      (error) => console.log("Error:", error)
    )
  }

  selectChat(id_chat: string){
    this.chat_selected = id_chat;
    this.open_chat = true;
  }
}
