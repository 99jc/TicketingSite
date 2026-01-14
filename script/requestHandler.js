import fs from "fs";
import { conn as db } from "../database/connect/mariadb.js";
import { v4 } from "uuid";
import { user } from "./auth.js";
import { concert } from "../src/dummy/concert.js";

const mainView = fs.readFileSync("../public/index.html", "utf-8");
const userMainView = fs.readFileSync("../public/user-index.html", "utf-8");
const signUpView = fs.readFileSync("../public/sign-up.html", "utf-8");
const signOutView = fs.readFileSync("../public/sign-out.html", "utf-8");
const loginView = fs.readFileSync("../public/login.html", "utf-8");
const moonLightPageView = fs.readFileSync("../public/moonlight.html", "utf-8");
const festivalPageView = fs.readFileSync("../public/festival.html", "utf-8");
const classicPageView = fs.readFileSync("../public/classic.html", "utf-8");
const reservationListPageView = fs.readFileSync(
  "../public/reserveList.html",
  "utf-8"
);

function main(response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  if (user.id === "") {
    response.write(mainView);
  } else {
    response.write(userMainView);
  }
  response.end();
}

function login(response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(loginView);
  response.end();
}

function signUp(response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(signUpView);
  response.end();
}

function signOut(response) {
  user.id = "";
  user.email = "";
  user.userType = "";
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  response.write(signOutView);
  response.end();
}

function moonLightPage(response) {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  response.write(moonLightPageView);
  if (user.id !== "") {
    response.write(
      `<form class="flex justify-between" id="formSubmit"><input type="number" name="count" class="w-[50px]" value="0" /><input type="text" name="concertId" class="hidden" value="${concert[0].id}" /><button type="submit" class="flex-1 bg-green-300 mx-3 rounded-lg hover:bg-green-400">예매하기</button></form>`
    );
  }
  response.write(
    `</div></div><p class="w-[800px] m-1 text-[20px] p-3 text-start">${concert[0].description}</p><a href="/"class="w-[400px] m-1 text-[20px] p-3 border border-black hover:bg-black hover:bg-opacity-10 rounded-sm text-center">홈으로</a></div><script>
      async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if (data.count > 0) {
          await fetch("/api/reservation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
        window.location.href = "/";
      }

      document
        .getElementById("formSubmit")
        .addEventListener("submit", handleSubmit);
    </script></div>`
  );
  response.end();
}

function festivalPage(response) {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  response.write(festivalPageView);
  if (user.id !== "") {
    response.write(
      `<form class="flex justify-between" id="formSubmit"><input type="number" name="count" class="w-[50px]" value="0" /><input type="text" name="concertId" class="hidden" value="${concert[1].id}" /><button type="submit" class="flex-1 bg-green-300 mx-3 rounded-lg hover:bg-green-400">예매하기</button></form>`
    );
  }
  response.write(
    `</div></div><p class="w-[800px] m-1 text-[20px] p-3 text-start">${concert[1].description}</p><a href="/"class="w-[400px] m-1 text-[20px] p-3 border border-black hover:bg-black hover:bg-opacity-10 rounded-sm text-center">홈으로</a></div><script>
      async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if (data.count > 0) {
          await fetch("/api/reservation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
        window.location.href = "/";
      }

      document
        .getElementById("formSubmit")
        .addEventListener("submit", handleSubmit);
    </script></div>`
  );
  response.end();
}

function classicPage(response) {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  response.write(classicPageView);
  if (user.id !== "") {
    response.write(
      `<form class="flex justify-between" id="formSubmit"><input type="number" name="count" class="w-[50px]" value="0" /><input type="text" name="concertId" class="hidden" value="${concert[2].id}" /><button type="submit" class="flex-1 bg-green-300 mx-3 rounded-lg hover:bg-green-400">예매하기</button></form>`
    );
  }
  response.write(
    `</div></div><p class="w-[800px] m-1 text-[20px] p-3 text-start">${concert[2].description}</p><a href="/"class="w-[400px] m-1 text-[20px] p-3 border border-black hover:bg-black hover:bg-opacity-10 rounded-sm text-center">홈으로</a></div><script>
      async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if (data.count > 0) {
          await fetch("/api/reservation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
        window.location.href = "/";
      }

      document
        .getElementById("formSubmit")
        .addEventListener("submit", handleSubmit);
    </script></div>`
  );
  response.end();
}

function submitSignUp(response, data) {
  const id = v4();
  const { email, password, userName, userType } = data;
  db.query(
    `INSERT INTO users VALUES ('${id}', '${email}', '${password}', '${userName}', '${userType}')`,
    (error, rows) => {
      console.log(rows);
    }
  );
  response.writeHead(302, {
    Location: "/",
  });
  response.end();
}

function SignIn(response, data) {
  const { email, password } = data;
  db.query(
    `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
    (error, rows) => {
      if (rows.length != 0) {
        user.id = rows[0].userId;
        user.email = rows[0].email;
        response.writeHead(200, {
          Location: "/",
        });
        response.end();
      } else {
        response.writeHead(404, {
          Location: "/",
        });
        response.end();
      }
    }
  );
}

function reservation(response, data) {
  const reservationId = v4();
  const { count, concertId } = data;
  db.query(
    `INSERT INTO reservation VALUES('${reservationId}', '${concertId}', '${
      user.id
    }', '${count}', '${new Date().toLocaleDateString()}')`
  );
  response.writeHead(302, {
    Location: "/",
  });
  response.end();
}

function reservationList(response) {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });
  response.write(reservationListPageView);
  db.query(
    `SELECT c.concertId, c.name, c.date, c.price, r.count, r.reservationId, r.reservationDate FROM concert c JOIN reservation r On r.concertId = c.concertId AND r.userId = '${user.id}'`,
    (error, rows) => {
      rows.map((element) =>
        response.write(`<div class="flex flex-col border border-black w-[300px] h-[187px]">
            <h2 class="px-2 text-[12px] h-[35px]">${element.reservationId}</h2>
            <div class="flex">
              <p class="w-[100px] bg-green-300 px-2 text-center h-[30px]">
                예매 공연명
              </p>
              <p class="flex-1 px-2 h-[30px] w-[75px] truncate">${
                element.name
              }</p>
            </div>
            <div class="flex">
              <p class="w-[100px] bg-green-300 px-2 text-center h-[30px]">
                예매 일자
              </p>
              <p class="flex-1 px-2 h-[30px]">${element.reservationDate}</p>
            </div>
            <div class="flex">
              <p class="w-[100px] bg-green-300 px-2 text-center h-[30px]">
                예매 가격
              </p>
              <p class="flex-1 px-2 h-[30px]">${element.price}</p>
            </div>
            <div class="flex">
              <p class="w-[100px] bg-green-300 px-2 text-center h-[30px]">
                예매 수량
              </p>
              <p class="flex-1 px-2 h-[30px]">${element.count}</p>
            </div>
            <div class="flex">
              <p class="w-[100px] bg-green-300 px-2 text-center h-[30px]">
                총 예매 가격
              </p>
              <p class="flex-1 px-2 h-[30px]">${
                element.price * element.count
              }</p>
            </div>
          </div>`)
      );
      response.write(`     
        </div>
        <a
          href="/"
          class="w-[400px] m-1 text-[20px] p-3 border border-black hover:bg-black hover:bg-opacity-10 rounded-sm text-center"
          >홈으로
        </a>
      </div>
    </div>`);
      response.end();
    }
  );
}

function css(response) {
  fs.readFile("../dist/output.css", (error, data) => {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
}

function moonlight(response) {
  fs.readFile("../src/dummy/image/Moonlight.jpg", (error, data) => {
    response.writeHead(200, { "Content-Type": "image/jpeg" });
    response.write(data);
    response.end();
  });
}
function festival(response) {
  fs.readFile("../src/dummy/image/festival.jpg", (error, data) => {
    response.writeHead(200, { "Content-Type": "image/jpeg" });
    response.write(data);
    response.end();
  });
}
function classic(response) {
  fs.readFile("../src/dummy/image/classic.jpg", (error, data) => {
    response.writeHead(200, { "Content-Type": "image/jpeg" });
    response.write(data);
    response.end();
  });
}

export let handle = {};
handle["/"] = main;
handle["/login"] = login;
handle["/sign-up"] = signUp;
handle["/moonlight"] = moonLightPage;
handle["/festival"] = festivalPage;
handle["/classic"] = classicPage;
handle["/reservationList"] = reservationList;

/* api */
handle["/api/sign-up"] = submitSignUp;
handle["/api/sign-in"] = SignIn;
handle["/api/sign-out"] = signOut;
handle["/api/reservation"] = reservation;
/* css 적용 */
handle["/dist/output.css"] = css;

/* image 적용 */
handle["/src/dummy/image/Moonlight.jpg"] = moonlight;
handle["/src/dummy/image/festival.jpg"] = festival;
handle["/src/dummy/image/classic.jpg"] = classic;
