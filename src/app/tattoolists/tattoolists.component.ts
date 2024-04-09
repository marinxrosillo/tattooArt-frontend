import { Component } from '@angular/core';
import { TattoolistService } from '../service/tattoolist.service';

@Component({
  selector: 'app-tattoolists',
  templateUrl: './tattoolists.component.html',
  styleUrls: ['./tattoolists.component.css']
})
export class TattoolistsComponent {
  tattoolists: any[] = [];
  newTattoolist: any = {};
  editingTattoolist: any = null;

  constructor(private tattoolistService: TattoolistService) { }

  ngOnInit(): void {
    this.getTattoolists();
  }

  getTattoolists(): void {
    this.tattoolistService.getTattoolists()
      .subscribe(tattoolists => this.tattoolists = tattoolists);
  }

  addTattoolist(): void {
    this.tattoolistService.addTattoolist(this.newTattoolist)
      .subscribe(tattoolist => {
        this.tattoolists.push(tattoolist);
        this.newTattoolist = {};
      });
  }

  editTattoolist(tattoolist: any): void {
    this.editingTattoolist = { ...tattoolist }; // Realiza una copia del usuario para edición
  }

  saveTattoolist(): void {
    if (this.editingTattoolist) {
      this.tattoolistService.editTattoolist(this.editingTattoolist)
        .subscribe(() => {
          // Actualiza el usuario editado en la lista
          const index = this.tattoolists.findIndex(tattoolist => tattoolist.id === this.editingTattoolist.id);
          if (index !== -1) {
            this.tattoolists[index] = { ...this.editingTattoolist };
          }
          this.editingTattoolist = null;
        });
    }
  }

  cancelEdit(): void {
    this.editingTattoolist = null;
  }

  deleteTattoolist(tattoolistId: number): void {
    this.tattoolistService.deleteTattoolist(tattoolistId)
      .subscribe(() => {
        // Elimina el usuario de la lista
        this.tattoolists = this.tattoolists.filter(tattoolist => tattoolist.id !== tattoolistId);
      });
  }
}