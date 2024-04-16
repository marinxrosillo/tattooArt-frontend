import { Component } from '@angular/core';
import { TattoolistService } from '../service/tattoolist.service';

@Component({
  selector: 'app-tattoolists',
  templateUrl: './tattoolists.component.html',
  styleUrls: ['./tattoolists.component.css']
})
export class TattoolistsComponent {
  tattoolist: any = null;
  tattoolists: any[] = [];
  newTattoolist: any = {};
  editingTattoolist: any = null;

  constructor(private tattoolistService: TattoolistService) { }

  ngOnInit(): void {
    this.getTattoolists();
  }

  getTattoolists(): void {
    this.tattoolistService.getTattooLists()
      .subscribe(tattoolists => this.tattoolists = tattoolists);
  }

  getById(id: number): void {
    this.tattoolistService.getById(id)
      .subscribe(tattoolist => this.tattoolist = tattoolist);
  }

  createTattoolist(): void {
    this.tattoolistService.createTattooList(this.newTattoolist)
      .subscribe(tattoolist => {
        this.tattoolists.push(tattoolist);
        this.newTattoolist = {};
      });
  }

  updateTattoolist(tattoolist: any): void {
    this.editingTattoolist = { ...tattoolist };
  }

  saveTattoolist(): void {
    if (this.editingTattoolist) {
      this.tattoolistService.updateTattooList(this.editingTattoolist)
        .subscribe(() => {
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
    this.tattoolistService.deleteTattooList(tattoolistId)
      .subscribe(() => {
        this.tattoolists = this.tattoolists.filter(tattoolist => tattoolist.id !== tattoolistId);
      });
  }
}
