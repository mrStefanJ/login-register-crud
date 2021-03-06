import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }


  onLogout() {
    this.authenticationService.logout();
  }
}
