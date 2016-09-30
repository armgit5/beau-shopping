import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
              <div class="container">
                <my-header></my-header>
                <router-outlet></router-outlet>
              </div>
            `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
