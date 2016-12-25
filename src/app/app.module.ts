import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ImageComponent } from './image/image.component';
import { LoginService } from './login/login.service';
import { InstagramService } from './instagram.service';
import { LocalStorageService } from './localStorage.service';

const routes = [
    { path: '', component: HomeComponent, canActivate: [LoginService] },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    declarations: [AppComponent, HomeComponent, LoginComponent, ImageComponent],
    imports: [BrowserModule, HttpModule, JsonpModule, RouterModule.forRoot(routes)],
    providers: [LoginService, InstagramService, LocalStorageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
