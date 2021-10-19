import { Injectable } from '@angular/core';
import { ViewService } from './view.service';
import { MyConfigType } from './FeatureFlagsService';

@Injectable()
export class MobileService extends ViewService {
  getView(): MyConfigType {
    return MyConfigType.mobile;
  }
}
