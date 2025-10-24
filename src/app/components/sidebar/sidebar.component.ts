
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
