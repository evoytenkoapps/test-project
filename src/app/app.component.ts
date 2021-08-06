import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-project';

  constructor(private oAuthService: OAuthService) {
    // this.oAuthService.initCodeFlow();
    this.oAuthService.configure(authCodeFlowConfig);
    // this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      if (!this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initCodeFlow();
      } else {
        this.oAuthService.setupAutomaticSilentRefresh();
      }
    });

    console.log('token', this.oAuthService.getAccessToken());
  }
}
