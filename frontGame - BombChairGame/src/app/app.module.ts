import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { EnterGameComponent } from './components/enter-game/enter-game.component';
import { HallComponent } from './components/hall/hall.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderHallComponent } from './components/header-hall/header-hall.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { WhoIsPlayingComponent } from './components/who-is-playing/who-is-playing.component';
import { EndGameComponent } from './components/end-game/end-game.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GameCardWinComponent } from './components/game-card-win/game-card-win.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhoPlayedComponent } from './components/who-played/who-played.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateGameComponent,
    EnterGameComponent,
    HallComponent,
    HeaderComponent,
    HeaderHallComponent,
    GameCardComponent,
    WhoIsPlayingComponent,
    EndGameComponent,
    SidebarComponent,
    GameCardWinComponent,
    NotFoundComponent,
    FooterComponent,
    WhoPlayedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
