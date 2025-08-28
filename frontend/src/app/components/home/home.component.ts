import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  startInvesting() {
    // TODO: route to your graphs/signup
    console.log('Start investing clicked');
  }
  learnMore() {
    // TODO: open modal or navigate to About
    console.log('Learn more clicked');
  }
}
