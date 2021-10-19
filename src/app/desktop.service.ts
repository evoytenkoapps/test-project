import { Injectable } from '@angular/core';
import { ViewService } from './view.service';
import { MyConfigType } from './FeatureFlagsService';

@Injectable()
export class DesktopService extends ViewService {
  getView(): MyConfigType {
    return MyConfigType.desktop;
  }
}
