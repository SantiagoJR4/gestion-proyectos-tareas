import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, map, Observable, of, tap } from 'rxjs';

export interface User{
  username:string;
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'app_auth_user';
  private _user$ = new BehaviorSubject<User | null>(null);
  private validUser = {username:'santiago', password:'prueba'}; //Credenciales predeterminadas

  constructor(private router:Router) { 
    this.restoreFromStorage();
  }

  get user$() : Observable<User | null>{
    return this._user$.asObservable();
  }

  get isAuthenticated(): boolean{
    return !!this._user$.value;
  }

  get currentUser(): User | null{
    return this._user$.value
  }

  getToken(): string | null {
    return this._user$.value?.token ?? null;
  }

  login(username:string, password:string): Observable<boolean>{
    const success = username === this.validUser.username && password === this.validUser.password
    if(!success){
      return of(false).pipe(delay(400));
    }
    const user: User = {
      username,
      token: 'fake-jwt-123456'
    }

    return of(user).pipe(
      delay(500),
      tap(u => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(u))
        this._user$.next(u);
      }),
      map(() => true)
    );
  }

  logout(redirectToLogin = true){
    localStorage.removeItem(this.STORAGE_KEY);
    this._user$.next(null);
    if(redirectToLogin){
      this.router.navigate(['/auth/login']);
    }
  }

  private restoreFromStorage(){
    if(typeof localStorage === 'undefined') return;
    try{
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if(!raw) return;
      const parsed: User = JSON.parse(raw);
      this._user$.next(parsed);
    }catch(e){
      console.warn('Error, no se pudo parsear auth en localStorage', e),
      localStorage.removeItem(this.STORAGE_KEY);
      this._user$.next(null);
    }
  }
}