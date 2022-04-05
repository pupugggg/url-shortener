# url shortener
## To run this backend application:

``` nodejs
npm i && npm run dev
```
## to run unit testing:
``` nodejs
npm test
```
## system archetechture
### This project can be separated by:
    1. index.js: The entry of the project.
    2. config: Define system config like connect to DB.
    3. routes: Define REST API routes.
    4. controllers: Define how to handle the requests.
    5. model: Define schema.
    6. middlewares: Define middlewares like Error handler.
    7. test: define test cases.
### system archetechture graph
    ![sysArch](./pic/SystemDiagramWBG.png)

## use case
### /api/v1/urls
![u1](./pic/usecase_1.png)
### /:id
![u2](./pic/usecase_2.png)