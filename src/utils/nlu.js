/* eslint-disable quote-props */
/**
 * nlu.js - util file for initializing Watson NLU tools
 * Code mainly from https://github.com/watson-developer-cloud/node-sdk#natural-language-understanding
 *
 * Louis Murerwa, Spring 2021
 */
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: 'kELf877N80Kh6wwKbADrL9CpsZOgnkjOCNo3hvh1oC0O',
  }),
  serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/135970db-5a87-4ee7-8988-e222e6f90491',
});

export default { naturalLanguageUnderstanding };
