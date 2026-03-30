import { provideHttpClient } from '@angular/common/http';
import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideZonelessChangeDetection
} from '@angular/core';
import {
	TitleStrategy,
	provideRouter,
	withComponentInputBinding
} from '@angular/router';

import {
	AppThemeService,
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
		provideAppInitializer(() => {
			inject(AppThemeService).init();
		}),
		{ provide: TitleStrategy, useClass: AppTitleStrategyService },
		{ provide: ScreenSizeObserver, useClass: BreakPointDetectorService }
	]
};
