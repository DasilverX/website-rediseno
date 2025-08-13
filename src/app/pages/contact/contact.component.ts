// En src/app/pages/contacto/contacto.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contact.service'; // Crearemos este servicio

@Component({
  selector: 'app-contacto',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactoComponent {
  contactForm: FormGroup;
  enviado = false;
  error = false;

  constructor(private fb: FormBuilder, private contactoService: ContactoService) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactoService.enviarFormulario(this.contactForm.value).subscribe({
        next: (response) => {
          this.enviado = true;
          this.contactForm.reset();
        },
        error: (err) => {
          this.error = true;
        }
      });
    }
  }
}