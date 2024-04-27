import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TattooList } from 'src/models/TattooList';
import { TattoolistService } from 'src/app/service/tattoolist.service';

@Component({
  selector: 'tattoolist-form',
  templateUrl: './tattoolist-form.component.html',
  styleUrls: ['./tattoolist-form.component.css']
})
export class TattooListFormComponent implements OnInit {

  title: string = "TATTOOLIST INFORMATION";

  tattoolist: TattooList = new TattooList();

  constructor(
    private tattoolistService: TattoolistService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.activatedRoute.params.subscribe(
      params => {
        let id: number = params['id'];
        if (id) {
          this.tattoolistService.getById(id).subscribe(
            tattoolist => this.tattoolist = tattoolist
          );
        }
      }
    );
  }

  create(): void {
    this.tattoolistService.createTattooList(this.tattoolist).subscribe(
      response => this.router.navigate(['admin'])
    );
  }

  update(): void {
    this.tattoolistService.updateTattooList(this.tattoolist).subscribe(
      response => this.router.navigate(['admin'])
    );
  }
}
