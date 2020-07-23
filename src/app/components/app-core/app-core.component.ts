import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.scss']
})
export class AppCoreComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      data => console.log(data)
    )
  }

}
