import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameAddComponent } from './game-add/game-add.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AllComponent } from './Catalog/all/all.component';
import { LoginComponent } from './login/login.component';
import {Auth} from './AUTH';
import { AdminComponent } from './admin/admin.component';
import { HistoryAdminComponent } from './history-admin/history-admin.component';
import { HistoryUserComponent } from './history-user/history-user.component';
import { RegisterComponent } from './register/register.component';
import { PaymentComponent } from './payment/payment.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { path: 'game', component: GameComponent, canActivate: [Auth] },
  { path: 'catalog', component: AllComponent },
  { path: 'add', component: GameAddComponent, canActivate: [Auth] },
  { path: 'detail', component: GameDetailComponent , canActivate: [Auth]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent , canActivate: [Auth]},
  { path: 'history', component: HistoryAdminComponent, canActivate: [Auth] },
  { path: 'hist', component: HistoryUserComponent , canActivate: [Auth]},
  { path: 'pay', component: PaymentComponent, canActivate: [Auth] },
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameAddComponent,
    GameDetailComponent,
    GameEditComponent,
    AllComponent,
    LoginComponent,
    AdminComponent,
    HistoryAdminComponent,
    HistoryUserComponent,
    RegisterComponent,
    PaymentComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
