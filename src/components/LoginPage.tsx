import React from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const [signUp, setSignUp] = React.useState<boolean>(false);

  interface User {
    name?: string;
    email: string;
    password: string;
  }

  const [user, setUser] = React.useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const Signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1337/login", {
        email: user.email,
        pass: user.password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        success("Login success");
        // navigate("/home");
        window.location.reload();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        error(err.response.data.message || "Login failed");
      } else {
        error("An error occurred");
      }
    }
  };

  const Signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1337/register", {
        name: user.name,
        email: user.email,
        pass: user.password,
      });

      if (response.status === 200) {
        success("Registration successful!");
        setSignUp(false); // Chuyển về giao diện đăng nhập sau khi đăng ký thành công
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        error(err.response.data.message || "Registration failed");
      } else {
        error("An error occurred during registration");
      }
    }
  };

  return (
    <section
      style={{ backgroundImage: "url(bg1.png)" }}
      className="w-full bg-cover bg-center"
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {contextHolder}
        <button
          onClick={() => {}}
          className="flex items-center mb-6 text-2xl font-semibold text-white bg-transparent border-none cursor-pointer p-0"
        >
          <img className="w-12 h-10 mr-2" src="hihihi.png" alt="logo" />
          Addicts Association
        </button>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {signUp ? "Sign up for an account" : "Sign in to your account"}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={signUp ? Signup : Signin}
            >
              {signUp && (
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your name"
                    required
                    value={user.name}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="mynameis@nghien.matuy"
                  required
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              {signUp ? (
                <div className="hidden"></div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>

                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      alert("Forgot password functionality not implemented")
                    }
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 bg-transparent border-none cursor-pointer p-0"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full text-black bg-[#1587ff] hover:bg-[#064589] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {!signUp ? "Sign in" : "Sign up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {signUp
                  ? "Already have an account? "
                  : "Don’t have an account yet? "}
                <button
                  onClick={() => setSignUp(!signUp)}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 bg-transparent border-none cursor-pointer p-0"
                >
                  {signUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
