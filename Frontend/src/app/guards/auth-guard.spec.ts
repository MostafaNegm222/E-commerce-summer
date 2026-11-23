import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  const run = () => TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('lets a user with a token through', () => {
    localStorage.setItem('token', 'abc');
    expect(run()).toBe(true);
  });

  it('redirects to /auth/login when there is no token', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    expect(run()).toBe(false);
    expect(navigate).toHaveBeenCalledWith('/auth/login');
  });
});
