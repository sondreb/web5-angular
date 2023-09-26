# Angular Web5 Example

## Steps to add web5 to the project

```sh
npm install crypto-browserify stream-browserify process
```

```sh
npm install @web5/api
```

Edit tsconfig.json compilerOptions section:

```json
    "paths": {
      "crypto": ["node_modules/crypto-browserify"],
      "stream": ["node_modules/stream-browserify"]
    }
```

Add polyfill.ts, as Angular no longer adds a polyfill by default, add the `polyfills.ts` to your src folder with this content.

```ts
(window as any).global = window;
global.Buffer = global.Buffer || require("buffer").Buffer;
import * as process from "process";
window["process"] = process;
```

This file must be added to both angular.json and tsconfig.app.json files:

angular.json:

```json
            "polyfills": [
              "zone.js",
              "src/polyfills.ts"
            ],
```

typescript.app.json:

```json
  "files": [
    "src/polyfills.ts",
    "src/main.ts"
  ],
```

This will add global, Buffer and process to the "global" scope, needed for backwards compatibility with some libraries that are primarily built for Node.js and not updated with ESM support.

As of current date, the library has a TypeScript definition error so you must turn on ignore validation for imported dependencies, add this to tsconfig.json compilerOptions section:

```
"skipLibCheck": true,
```

Next you might get an types error, so perform this operation:

```sh
npm i --save-dev @types/readable-stream
```

Edit the app.component.ts with a basic example to verify successful usage of the library:

```ts
import { Component } from "@angular/core";
import { Web5 } from "@web5/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "app";

  async ngOnInit() {
    const { web5, did: myDid } = await Web5.connect();
    console.log(myDid);
    console.log(web5);
  }
}
```

First time you run, the browser will auto-generate a private key and DID. Next reload, it will load it from storage in the browser, this might take a few seconds while some data is decrypted.

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
