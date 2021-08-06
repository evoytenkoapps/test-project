import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-project';

  constructor(private oAuthService: OAuthService) {
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService
      .loadDiscoveryDocumentAndTryLogin()
      .then((data) => {
        console.log('doc loaded', data);
        this.oAuthService.initCodeFlow();
      })
      .catch((e) => console.error(e));
  }
}
