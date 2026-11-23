import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth-service';

// Builds a fake JWT: header.payload.signature, with a base64 JSON payload.
const fakeToken = (payload: object) => `h.${btoa(JSON.stringify(payload))}.s`;

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(AuthService);
  });

  it('returns null when there is no token', () => {
    expect(service.getPayloadFromToken()).toBeNull();
  });

  it('decodes the payload of a stored token', () => {
    localStorage.setItem('token', fakeToken({ _id: 'u1', role: 'admin' }));
    expect(service.getPayloadFromToken()).toEqual({ _id: 'u1', role: 'admin' });
  });

  it('returns null for a malformed token', () => {
    localStorage.setItem('token', 'not-a-jwt');
    expect(service.getPayloadFromToken()).toBeNull();
  });

  it('logout removes the token', () => {
    localStorage.setItem('token', 'abc');
    service.logout();
    expect(service.getToken()).toBeNull();
  });
});
