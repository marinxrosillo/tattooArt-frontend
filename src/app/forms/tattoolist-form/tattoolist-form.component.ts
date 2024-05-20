import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TattooList } from 'src/models/TattooList';
import { TattoolistService } from 'src/app/service/tattoolist.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'tattoolist-form',
  templateUrl: './tattoolist-form.component.html',
  styleUrls: ['./tattoolist-form.component.css']
})
export class TattooListFormComponent implements OnInit {

  title: string = "INFORMACIÓN DEL TATUAJE";

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

  create(form: NgForm): void {
    if(form.valid === false) {
      return;
    }

    this.tattoolistService.createTattooList(this.tattoolist).subscribe(
      response => this.router.navigate(['admin'])
    );
  }

  update(form: NgForm): void {
    if(form.valid === false) {
      return;
    }

    this.tattoolistService.updateTattooList(this.tattoolist).subscribe(
      response => this.router.navigate(['admin'])
    );
  }
}
