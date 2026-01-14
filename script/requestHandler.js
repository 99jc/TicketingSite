import fs from "fs";

const mainView = fs.readFileSync("../public/index.html", "utf-8");
const signUpView = fs.readFileSync("../public/sign-up.html", "utf-8");

async function main(response) {
  console.log("main");
  console.log(result);
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(mainView);
  response.end();
}

function login(response) {
  console.log("login");

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Login page");
  response.end();
}

function signUp(response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(signUpView);
  response.end();
}

function css(response) {
  fs.readFile("../dist/output.css", (error, data) => {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
}
export let handle = {};
handle["/"] = main;
handle["/login"] = login;
handle["/sign-up"] = signUp;

/* api */
handle["/api/sign-up"] = submitSignUp;

/* css 적용 */
handle["/dist/output.css"] = css;
