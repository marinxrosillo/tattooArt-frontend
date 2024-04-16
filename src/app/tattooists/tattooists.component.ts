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
  tattooist: any = null;
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

  getById(id: number): void {
    this.tattooistService.getById(id)
      .subscribe(tattooist => this.tattooist = tattooist);
  }

  createTattooist(): void {
    this.tattooistService.createTattooist(this.newTattooist)
      .subscribe(tattooist => {
        this.tattooists.push(tattooist);
        this.newTattooist = {};
      });
  }

  updateTattooist(tattooist: any): void {
    this.editingTattooist = { ...tattooist };
  }

  saveTattooist(): void {
    if (this.editingTattooist) {
      this.tattooistService.updateTattooist(this.editingTattooist)
        .subscribe(() => {
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
        this.tattooists = this.tattooists.filter(tattooist => tattooist.id !== tattooistId);
      });
  }
}
