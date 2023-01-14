1. [Node Express API on AWS](#node-express-api-on-aws)
   1. [Local Development](#local-development)
   2. [Deployment](#deployment)
      1. [Endpoints](#endpoints)
   3. [Invocation](#invocation)
   4. [Scenarios](#scenarios)
      1. [Scenario: Success](#scenario-success)
      2. [Scenario: 400 error - listing all cities weather info is not supported](#scenario-400-error---listing-all-cities-weather-info-is-not-supported)
      3. [Scenario: Searching non-existent cities](#scenario-searching-non-existent-cities)
      4. [Scenario: Empty string was passed as city name](#scenario-empty-string-was-passed-as-city-name)
      5. [Scenario: Unexpected input property](#scenario-unexpected-input-property)
      6. [Scenario: 404 non existing path is called](#scenario-404-non-existing-path-is-called)
   5. [Future Implementation](#future-implementation)
   6. [Reference](#reference)



# Node Express API on AWS

REST ful API for OpenWeather

a simple Node Express API service running on AWS Lambda with nodeJS

## Local Development
```
nvm use v14.18
sls offline
```
After running offline, the below urls will be available:
| TYPE | URL                                     |
| ---- | --------------------------------------- |
| GET  | http://localhost:3000/dev/cities?name={ENTER CITY NAME}     |
| POST | http://localhost:3000/dev/cities?name={Enter CITY NAME}          |

Future endpoints !! (NOT IMPLEMENTED YET)
| GET  | http://localhost:3000/dev/cities?lat=xxx&lon=xxx     |
| GET  | http://localhost:3000/dev/cities/{cityId}     |

## Deployment
```
npm install
sls deploy
```
### Endpoints
After running deploy, the below endpoints will be available:
| TYPE | URL                                                                          |
| ---- | ---------------------------------------------------------------------------- |
| POST | https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/cities         |
| GET  | https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/cities/{id}    |


## Invocation
After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.ap-northeast-1.amazonaws.com/cities?name=Sydney
```

Which should result in the following response:

```
{ "message": "Hello Tokyo! Current temperature is 9.62 degree, and weather condition is light intensity shower rain!" }
```


## Scenarios
### Scenario: Success
```
   When I request "GET /cities?name=Sydney"
   Then I get a "200" response
   And return a message says:
   ""
   Hello Sydney! Current temperature is xx.xx degree, and weather condition is xxxx!
   ""
```

### Scenario: 400 error - listing all cities weather info is not supported
```
   When I request "Get /cities"
   Then I get "400" with a message "not supported function"
```

### Scenario: Searching non-existent cities
```
   When I request "Get /cities?name=TEST"
   Then I get "404" with a message "City not found"
```

### Scenario: Empty string was passed as city name
```
   When I request "Get /cities?name="
   Then I get "404" with a message "City not found"
```

### Scenario: Unexpected input property
```
   When I request "Get /cities?lat="
   Then I get "400" with a message "Name property not found"
```

### Scenario: 404 non existing path is called
```
   When I request "Get /NONEXISTINGPATH"
   Then I get "404" with a message "Not Found"
```


## Future Implementation
* add more endpoints for different services
* only allow selected users to access the service with JWT Tokens etc? Refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).


## Reference
* http event management [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/)