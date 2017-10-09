// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false
};

export const apiMethods = {
  v1: true,
  vCompanies: false,
  vWuth: false
};

export const apiUrl = {
  // url: 'https://api-oasit.herokuapp.com'
  url: 'http://oasit-env.rmm4dcfjgy.ap-southeast-1.elasticbeanstalk.com'
};

export const imageUrls = {
  // tslint:disable-next-line:max-line-length
  defaultImage: 'https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/cup-of-black-coffee1.jpg?alt=media&token=94afc335-0a25-4956-aea8-6d1fe140b65d'
}
