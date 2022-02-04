import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
/* import { DotLinesComponent } from './dot-lines/dot-lines.component';
import { QuestionInViewComponent } from './question-in-view/question-in-view.component';
import { QuestionOutViewComponent } from './question-out-view/question-out-view.component';

import { ResumeViewComponent } from './resume-view/resume-view.component';
import { MedalViewComponent } from './medal-view/medal-view.component';
import { ViewerComponent } from './video-view/viewer/viewer.component';
import { NoContentViewComponent } from './no-content-view/no-content-view.component';
import { SearchContentViewComponent } from './search-content-view/search-content-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditperfilComponent } from './editperfil/editperfil.component';
import { ModalInforComponent } from './modal-infor/modal-infor.component';
/* 
import { ChallengeComponent } from './challenge/challenge.component';
import { QuestionComponent } from './challenge/question/question.component';
import { SurveyComponent } from './challenge/survey/survey.component';
import { MinilinkComponent } from './challenge/minilink/minilink.component';
import { OnboardComponent } from './onboard/onboard.component'; */
// import { Screenshot } from '@ionic-native/screenshot';
/* import { NgCircleProgressModule } from 'ng-circle-progress';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx'; */

@NgModule({
  declarations: [
    WelcomeMessageComponent,
    EditperfilComponent,
    ModalInforComponent,
    /*  TitleComponent,
    DotLinesComponent,
    QuestionInViewComponent,
    QuestionOutViewComponent,
    VideoViewComponent,
    ResumeViewComponent,
    MedalViewComponent,
    ViewerComponent,
    SearchContentViewComponent,
    NoContentViewComponent,
    UserProfileComponent,
    ChallengeComponent,
    QuestionComponent,
    SurveyComponent,
    MinilinkComponent,
    OnboardComponent, */
  ],
  exports: [
    WelcomeMessageComponent,
    ModalInforComponent,
    /* TitleComponent,
    DotLinesComponent,
    QuestionInViewComponent,
    QuestionOutViewComponent,
    VideoViewComponent,
    ResumeViewComponent,
    MedalViewComponent,
    ViewerComponent,
    SearchContentViewComponent,
    NoContentViewComponent,
    UserProfileComponent,
    ChallengeComponent,
    QuestionComponent,
    SurveyComponent,
    MinilinkComponent,
    OnboardComponent, */
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    /*   NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }), */
  ],
  providers: [
    /* SocialSharing */
  ],
})
export class ComponentsModule {}
