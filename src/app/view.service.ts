import { Injectable } from '@angular/core';
import { MyConfigType } from './FeatureFlagsService';

@Injectable()
export abstract class ViewService {
  abstract getView(): MyConfigType;
}
