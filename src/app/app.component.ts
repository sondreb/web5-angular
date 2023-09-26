import { Component } from '@angular/core';
import { Web5 } from '@web5/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  async ngOnInit() {
    const { web5, did: myDid } = await Web5.connect();
    console.log(myDid);
    console.log(web5);
  }
}
