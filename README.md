# TemplateNodeJS
TemplateNodeJS project
## Discription
##. hapijs
##. mysql
##. swagger
##. eslint
## Installation
####1. Clone this project or Download that ZIP file
####2.  Make sure you have [npm](https://www.npmjs.org/) installed globally

More details here
https://nodejs.org/en/download/ 

####// note:
 - Create .env base on .env-template

####3. On the command prompt run the following commands

```sh
$ cd `project-directory`
```
```sh
$ npm install 
```
```sh
$ npm start
```

## Try http://localhost:5001/documentation

# Deploy docker
docker build -f Dockerfile -t <tencontainer>:latest .
docker run -v -d -p 12345:9999 -t <tencontainer>:latest

# System design
https://drive.google.com/file/d/1suyjWHR82GvFKaPtnIojiGSZrfrW8Ang/view?usp=sharing

