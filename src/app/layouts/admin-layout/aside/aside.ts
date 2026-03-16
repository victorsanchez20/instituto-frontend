import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../../services/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside implements OnInit {
  menuOpen$!: Observable<boolean>;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuOpen$ = this.menuService.menuOpen$;
  }

  closeMenu() {
    this.menuService.closeMenu();
  }
}
