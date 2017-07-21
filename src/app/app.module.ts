import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { routeConfig,navigatableComponents } from "./app.routing";

// import { CoffeeComponent } from './coffees/coffee.component';
// import { CoffeeEditComponent } from './coffee-edit/coffee-edit.component';
import { CoffeePipe } from "./coffees/coffee.pipe";
// import { CategoryComponent } from './coffees/category/category.component';

import { HeaderComponent } from "./header.component";
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { CoffeeService } from './coffees/coffee.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { QueueComponent } from './queue/queue.component';
import { QueueService } from './queue/queue.service';

// import { ImageCropperComponent } from 'ng2-img-cropper';
import { CategoryService } from './coffees/category/category.service';
import { ModalModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { UsersComponent } from './admin/users/users.component';
import { NavbarComponent } from './admin/shared/navbar/navbar.component';
import { CoffeeModule } from './coffees/coffee.module';


@NgModule({
  declarations: [
    AppComponent,
    ...navigatableComponents,
    HeaderComponent,
    QueueComponent,

    // CoffeePipe,
    // CoffeeComponent,
    // CoffeeEditComponent,
    // CategoryComponent,
    // ImageCropperComponent,

    LoginComponent,
    AdminComponent,
    SidebarComponent,
    UsersComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    // ReactiveFormsModule,
    // ModalModule.forRoot(),
    // AlertModule.forRoot(),

    CoffeeModule
  ],
  providers: [CoffeeService,
              QueueService,
              CategoryService,
              LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
