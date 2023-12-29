# Angular Web5 Example

## Steps to add web5 to the project

```sh
npm install @web5/api crypto-browserify stream-browserify
```

```sh
npm i -D @angular-builders/custom-webpack
```

Previous examples used different methods, this has been updated to only rely on custom webpack configurationa for everything.

#1: Modify your builders in angular.json, to any of these: `@angular-builders/custom-webpack:[browser|server|karma|dev-server|extract-i18n]`

#2: Change the `"browser": "src/main.ts",` to `"main": "src/main.ts",` in angular.json

#3: Create the `webpack.config.js` file with this content:

```js
const webpack = require('webpack');

module.exports = {
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.NormalModuleReplacementPlugin(
            /node:crypto/,
            require.resolve('crypto-browserify')
        ),
        new webpack.DefinePlugin({
            global: 'globalThis',
        }),
    ],
};
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
