import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MaterialModule } from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ShowsComponent } from './pages/shows/shows.component';
import { PeopleComponent } from './pages/people/people.component';
import { MovieDetailsComponent } from './pages/details/movie-details/movie-details.component';
import {HttpHeadersInterceptor} from "./interceptors/http-headers.interceptor";
import {HttpErrorsInterceptor} from "./interceptors/http-errors.interceptor";
import { ShowItemComponent } from './components/show-item/show-item.component';
import { ShowDetailsComponent } from './pages/details/show-details/show-details.component';
import { PersonDetailsComponent } from './pages/details/person-details/person-details.component';
import { PersonItemComponent } from './components/person-item/person-item.component';
import { ShowSeasonDetailsComponent } from './pages/details/show-season-details/show-season-details.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'shows', component: ShowsComponent},
  {path: 'people', component: PeopleComponent},
  {path: 'movies/:id', component: MovieDetailsComponent},
  {path: 'shows/:id', component: ShowDetailsComponent},
  {path: 'shows/:id/seasons/:season_num', component: ShowSeasonDetailsComponent},
  {path: 'people/:id', component: PersonDetailsComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    HomeComponent,
    MovieItemComponent,
    SearchFormComponent,
    ShowsComponent,
    PeopleComponent,
    MovieDetailsComponent,
    ShowItemComponent,
    ShowDetailsComponent,
    PersonDetailsComponent,
    PersonItemComponent,
    ShowSeasonDetailsComponent,
    RecommendationsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
