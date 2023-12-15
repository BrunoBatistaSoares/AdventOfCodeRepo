import { Component } from '@angular/core';
import { D12P1 } from '../Solutions/D12P1';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  input: string = '';
  result: string = '';

  processInput() {

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('../app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        this.result = data.result;
      };
      worker.postMessage(this.input);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

    //this.result = D12P1(this.input).toString();
  }

  onValueChange($event: Event) {
    this.input = ($event.target as HTMLTextAreaElement).value;
  }


}
