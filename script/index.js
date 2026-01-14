import { route } from "../script/route.js"; // router.js에서 route라는 함수를 사용한다
import { start } from "../script/server.js"; // server.js의 모든 export 함수 또는 오브젝트를 불러온다
import { handle } from "../script/requestHandler.js"; // requestHandler의 모든 export 함수 또는 오브젝트를 불러온다

start(route, handle);
