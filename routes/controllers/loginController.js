import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const password = params.get("password");

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  
  if (userFromDatabase.length != 1) {
    const data = {
      error: "Wrong email or password",
      email: email,
      password: password,
    }
    render("login.eta", data);
  } else {

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    const data = {
      error: "Wrong email or password",
      email: email,
      password: password,
    }
    render("login.eta", data);
  } else {
    await state.session.set("user", user);
    response.redirect("/questions");
  }

  
}
};



const showLoginForm = ( { render }) => {
  const data = {
    error: null,
    email: "",
    password: "",
  }
  
  render("login.eta", data);
};

const logout = async ({ response, state }) => {
  
  await state.session.set("user", null);
  response.redirect("/");
};

export { processLogin, showLoginForm, logout };