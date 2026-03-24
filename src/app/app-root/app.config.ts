import { provideHttpClient } from '@angular/common/http';
import {
    ApplicationConfig,
    provideZonelessChangeDetection
} from '@angular/core';
import {
    TitleStrategy,
    provideRouter,
    withComponentInputBinding
} from '@angular/router';

import {
    AppTitleStrategyService,
    BreakPointDetectorService,
    ScreenSizeObserver
} from '../shared';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideZonelessChangeDetection(),
		{ provide: TitleStrategy, useClass: AppTitleStrategyService },
		{ provide: ScreenSizeObserver, useClass: BreakPointDetectorService }
	]
};
