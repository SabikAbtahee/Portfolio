import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'portfolio-theme-preference';

@Injectable({ providedIn: 'root' })
export class AppThemeService {
	private readonly doc = inject(DOCUMENT);

	private readonly preference = signal<ThemePreference>('system');
	private mediaQuery: MediaQueryList | null = null;

	readonly preference$ = this.preference.asReadonly();

	readonly resolvedTheme = computed<'light' | 'dark'>(() =>
		this.resolveTheme(this.preference())
	);

	init(): void {
		this.preference.set(this.readStoredPreference());
		this.syncMediaListener();
		this.applyToDocument();
	}

	private readStoredPreference(): ThemePreference {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw === 'light' || raw === 'dark' || raw === 'system') {
			return raw;
		}

		return 'system';
	}

	private resolveTheme(pref: ThemePreference): 'light' | 'dark' {
		if (pref === 'light') {
			return 'light';
		}
		if (pref === 'dark') {
			return 'dark';
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}

	private syncMediaListener(): void {
		if (this.preference() !== 'system') {
			return;
		}
		this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		this.mediaQuery.addEventListener('change', this.applyToDocument);
	}

	private applyToDocument(): void {
		const theme = this.resolveTheme(this.preference());
		const el = this.doc.documentElement;
		el.dataset['theme'] = theme;
		el.style.colorScheme = theme;
	}
}
