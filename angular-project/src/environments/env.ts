import { isDevMode } from '@angular/core';
import { environment as devEnvironment } from './envs/environment.dev';
import { environment as prodEnvironment } from './envs/environment.prod';

export const environment = (isDevMode() ? devEnvironment : prodEnvironment);