import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import { ShowNav } from '../navigation/store/nav.actions';

@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent {
  showNav() {
    this.store.dispatch(new ShowNav());
  }

  constructor(
    private store: Store<AppState>
  ) { }

}
