import { createServer } from "http"; // Node.js에서 http서버를 만들고 요청을 보내기 위한 기본 내장 모듈

export function start(route, handle) {
  async function onRequest(request, response) {
    await route(request, response, handle);
  }

  createServer(onRequest).listen(8888); // 포트8888로 서버를 생성한다
}
