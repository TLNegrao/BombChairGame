import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  menuStatus: boolean = false;
  SideNavToggled() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

}
