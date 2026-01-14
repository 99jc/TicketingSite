export async function route(request, response, handle) {
  const pathname = request.url;
  console.log(pathname);

  /* 강의에서는 typeof로 비교를 했으나 instanceof도 가능하다 */
  if (handle[pathname] instanceof Function) {
    if (request.method === "POST") {
      let body = "";
      request.on("data", (chunk) => (body += chunk));
      request.on("end", () => {
        const data = JSON.parse(body);
        handle[pathname](response, data);
      });
    } else {
      handle[pathname](response);
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("Not found.");
    response.end();
  }
}
