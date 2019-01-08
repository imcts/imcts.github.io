# The Bear Project.

##### install
```shell
npm install
```
명령어를 콘솔에서 실행하여 관련 모듈을 설치 합니다.

##### build
배포단계에 맞는 빌드 명령어를 수행하여 빌드를 수행합니다. 빌드된 결과물은 `/dist`폴더에서 확인할 수 있습니다.
````shel
npm run build:dev
````
명령어를 실행하여 `development` 빌드를 수행 합니다.

```shell
npm run build:prod
```
명령어를 실행하여 `production`빌드를 수행 합니다.

#### server
```
npm run server
```
명령어를 실행하여 `webpack-dev-server`를 실행합니다. `http://localhost:3000`으로 확인할 수 있습니다.
