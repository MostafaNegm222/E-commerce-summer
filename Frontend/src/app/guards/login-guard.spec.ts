import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { loginGuard } from './login-guard';

describe('loginGuard', () => {
  const run = () => TestBed.runInInjectionContext(() => loginGuard({} as any, {} as any));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('shows the login pages when the user is signed out', () => {
    expect(run()).toBe(true);
  });

  it('sends a signed-in user to /home', () => {
    localStorage.setItem('token', 'abc');
    const result = run();
    expect(TestBed.inject(Router).serializeUrl(result as any)).toBe('/home');
  });
});
