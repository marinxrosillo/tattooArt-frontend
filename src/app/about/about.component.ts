import { Component, OnInit } from '@angular/core';
import { TattooistService } from '../service/tattooist.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  tattooists: any[] = [];

  constructor(private tattooistService: TattooistService) { }

  ngOnInit(): void {
    this.getTattooists();
  }

  getTattooists(): void {
    this.tattooistService.getTattooists()
      .subscribe(tattooists => this.tattooists = tattooists);
  }
}
