## run
```shell
yarn or npm install
```
``` shell
yarn start or npm run start
```
## upload
#### url
POST http://localhost:8000/file/upload
#### body params
file
path (file save path)
## read
GET http://localhost:8000/(file path)
## download
GET http://localhost:8000/file/download?url=/demo/20230907150405543.jpeg
## downloadMany (return zip)
GET http://localhost:8000/file/downloadMany?urls=/demo/20230907150405543.jpeg&urls=/demo/20230907151254056.jpeg
