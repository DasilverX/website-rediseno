// En src/app/services/contacto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  // La URL donde subirás tu script de PHP
  private apiUrl = 'https://tu-dominio.com/api/send_email.php';

  constructor(private http: HttpClient) { }

  enviarFormulario(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}