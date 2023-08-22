import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registerValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const email = params.get("email");
  const password = params.get("password");
  const [passes, errors] = await validasaur.validate(
    { email, password },
    registerValidationRules,
  );
  if (!passes) {
    const data = {
      validationErrors: errors,
      email: email,
      password: password,
    };
    render("register.eta", data);
  } else {
    await userService.addUser(
      email,
      await bcrypt.hash(password),
    );
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("register.eta", { email: "", password: "" });
};

export { registerUser, showRegistrationForm };
