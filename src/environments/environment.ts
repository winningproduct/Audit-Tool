// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: 'https://auth.winningproduct.com/'
  + 'login?response_type=code&client_id=6r1eenlevnui1fe4epbp5vjfrn&redirect_uri=http://localhost:4200/auth',
  redirectSignIn: 'http://localhost:4200/auth',
  redirectSignOut: 'http://localhost:4200/auth',
  host: window.location.origin + '/dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error'; // Included with Angular CLI.
