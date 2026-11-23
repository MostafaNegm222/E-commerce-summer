import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { roleGuard } from './role-guard';
import { AuthService } from '../services/auth-service';

describe('roleGuard', () => {
  let payload: any;
  const run = () =>
    TestBed.runInInjectionContext(() => roleGuard({ data: { role: 'admin' } } as any, {} as any));
  const url = (tree: any) => TestBed.inject(Router).serializeUrl(tree);

  beforeEach(() => {
    payload = null;
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { getPayloadFromToken: () => payload } },
      ],
    });
  });

  it('sends a signed-out visitor to /auth/login', () => {
    expect(url(run())).toBe('/auth/login');
  });

  it('sends a user without the required role to /home', () => {
    payload = { role: 'user' };
    expect(url(run())).toBe('/home');
  });

  it('lets the required role through', () => {
    payload = { role: 'admin' };
    expect(run()).toBe(true);
  });
});
