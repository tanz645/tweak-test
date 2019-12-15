# Tweak Exercise

A project to showcase your understanding of web technologies.
Using Node.js, AWS Lamda, Mongo.

## Description

Its app to register user, login to get authorization token and use that to hit 
some endpoints to upload and retrieve images. 

## Endpoints

### User

#### Register new user:

``https://t91jimlgji.execute-api.eu-west-1.amazonaws.com/dev/user/register`` 

Method: POST
Body: {JSON}
```
{
    userName: '',
    password: '',
    repeatPassword: ''
}
```


#### Login:

``https://t91jimlgji.execute-api.eu-west-1.amazonaws.com/dev/user/login`` 

Method: POST
Body: {JSON}
```
{
    userName: '',
    password: ''
}
```
Response: {String} - Token

### Image

#### Upload:

``https://t91jimlgji.execute-api.eu-west-1.amazonaws.com/dev/image/upload`` 

Method: POST
Body: {FORM-DATA}
```
image: <filea>}
```
Header: 

```
Authorization: <Token>}
```

#### Retrieve:

``https://t91jimlgji.execute-api.eu-west-1.amazonaws.com/dev/image?fileName=`` 

Method: GET
Param: {String} - key=value
```
fileName=''
```
Header: 

```
Authorization: <Token>}
```

Response: {JSON} - Image data
