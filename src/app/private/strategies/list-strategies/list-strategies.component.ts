import { Component, OnInit } from '@angular/core';
import {Strategies} from "../../../common/models/strategies.model";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {StrategiesService} from "../../services/strategies.service";

@Component({
  selector: 'app-list-strategies',
  templateUrl: './list-strategies.component.html',
  styleUrls: ['./list-strategies.component.css']
})
export class ListStrategiesComponent implements OnInit {

  strategies: Array<Strategies>;
  isLoading = true;

  constructor(private _authS: AuthenticationService,
              private _straS:StrategiesService) { }

  ngOnInit() {
    this.getAllStrategies();
  }

  private getAllStrategies() {
    this._straS.getAllByUsername(this._authS.user.username).subscribe(
      (data: Strategies[]) => {
        //next
        this.strategies = data
        this.isLoading = false;
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Finished getAllGames');

      }
    )
  }

  onDeleteStrategy(strategy: Strategies) {
    this.isLoading = true;
    console.log(`Estrategia a eliminar: ${strategy.strategy}`);
    this._straS.onDelete(strategy).subscribe((data) => {
        this.getAllStrategies();
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished onDeleteStrategy');
      })
      this.isLoading = false;
  }
}
