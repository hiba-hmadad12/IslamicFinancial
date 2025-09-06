import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService, UserDto } from '../../services/auth.service'; // <-- chemin OK

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  open = false;

  // ✔️ types explicites
  user$: Observable<UserDto | null>;
  isLoggedIn$: Observable<boolean>;

  constructor(public auth: AuthService, private router: Router) {
    this.user$ = this.auth.currentUser$;
    this.isLoggedIn$ = this.auth.currentUser$.pipe(map(u => !!u));
  }

  toggle() { this.open = !this.open; }
  close()  { this.open = false; }

  signOut() {
    // purge l’auth (ne redirige pas ici, on le fait juste après)
    this.auth.logout(false);
    // Home est public; si l'utilisateur clique ensuite une page protégée,
    // le guard le redirigera vers /sign-in?returnUrl=...
    this.router.navigateByUrl('/');
    this.close();
  }
}
