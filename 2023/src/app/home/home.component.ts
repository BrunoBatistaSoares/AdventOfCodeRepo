import { Component } from '@angular/core';
import { D2P2 } from '../Solutions/D2P2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  input: string = '';
  result: string = '';

  processInput() {
    this.result = D2P2(this.input).toString();
  }

  onValueChange($event: Event) {
    this.input = ($event.target as HTMLTextAreaElement).value;
  }


}
