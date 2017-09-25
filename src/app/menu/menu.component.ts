import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import { ShowNav } from '../navigation/store/nav.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  showNav() {
    this.store.dispatch(new ShowNav());
  }

  constructor(
    private store: Store<AppState>
  ) { }

}
