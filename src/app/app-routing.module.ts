import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// PAGES 
import { HomepageComponent } from './pages/homepage/homepage.component'
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component'


const routes: Routes = [
  {path:'home',
   pathMatch:'full',
   component: HomepageComponent,
  },
  {path:'leaderboard',
   pathMatch:'full',
   component: LeaderboardComponent,
  },
  {path:'',
   pathMatch:'full',
   redirectTo:'home'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
