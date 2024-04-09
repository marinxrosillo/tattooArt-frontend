import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TattooistService } from '../service/tattooist.service';

@Component({
  selector: 'app-tattooists',
  templateUrl: './tattooists.component.html',
  styleUrls: ['./tattooists.component.css']
})
export class TattooistsComponent {
  tattooists: any[] = [];
  newTattooist: any = {};
  editingTattooist: any = null;

  constructor(private tattooistService: TattooistService) { }

  ngOnInit(): void {
    this.getTattooists();
  }

  getTattooists(): void {
    this.tattooistService.getTattooists()
      .subscribe(tattooists => this.tattooists = tattooists);
  }

  addTattooist(): void {
    this.tattooistService.addTattooist(this.newTattooist)
      .subscribe(tattooist => {
        this.tattooists.push(tattooist);
        this.newTattooist = {};
      });
  }

  editTattooist(tattooist: any): void {
    this.editingTattooist = { ...tattooist }; // Realiza una copia del usuario para edición
  }

  saveTattooist(): void {
    if (this.editingTattooist) {
      this.tattooistService.editTattooist(this.editingTattooist)
        .subscribe(() => {
          // Actualiza el usuario editado en la lista
          const index = this.tattooists.findIndex(tattooist => tattooist.id === this.editingTattooist.id);
          if (index !== -1) {
            this.tattooists[index] = { ...this.editingTattooist };
          }
          this.editingTattooist = null;
        });
    }
  }

  cancelEdit(): void {
    this.editingTattooist = null;
  }

  deleteTattooist(tattooistId: number): void {
    this.tattooistService.deleteTattooist(tattooistId)
      .subscribe(() => {
        // Elimina el usuario de la lista
        this.tattooists = this.tattooists.filter(tattooist => tattooist.id !== tattooistId);
      });
  }
}