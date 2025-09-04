import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service'; // <-- adjust path if needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  open = false;
  user$;
  isLoggedIn$;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.currentUser$;
    this.isLoggedIn$ = this.auth.currentUser$.pipe(map(u => !!u));
  }

  toggle() { this.open = !this.open; }
  close()  { this.open = false; }

  signOut() {
    this.auth.logout();
    this.router.navigateByUrl('/sign-in');
    this.close();
  }
}
