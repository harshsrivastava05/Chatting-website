import React, { useState } from "react";
import { Button } from "../../components/buttons";
import { Input } from "../../components/inputs";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Form = ({ signedin = true }) => {
  const [isSignedin, setIsSignedin] = useState(signedin);
  const [data, setdata] = useState({
    ...(!isSignedin && {
      fullname: "",
    }),
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white w-[500px] h-full shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-3xl font-bold">
          {isSignedin ? "Welcome Back!" : "Welcome!"}
        </div>
        <div className="text-xl font-light mb-7">
          {isSignedin ? "Sign in to get started" : "Sign up to get started"}
        </div>
        <form
          onSubmit={() => {
            console.log("Form submitted!");
          }}
          className="flex flex-col items-center w-full"
        >
          {!isSignedin && (
            <Input
              label="Full name"
              placeholder="Enter your name"
              type="text"
              name="name"
              isrequired={true}
              className="w-2/3"
              inputClassname="mb-6 w-full"
              value={data.fullname}
              onChange={(e) => setdata({ ...data, fullname: e.target.value })}
            ></Input>
          )}
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            isrequired={true}
            className="w-2/3"
            inputClassname="mb-6 w-full"
            value={data.email}
            onChange={(e) => setdata({ ...data, email: e.target.value })}
          ></Input>
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            isrequired={true}
            className="w-2/3"
            inputClassname="mb-6 w-full"
            value={data.password}
            onChange={(e) => setdata({ ...data, password: e.target.value })}
          ></Input>
          <Button
            name={isSignedin ? "Sign in" : "Sign up"}
            type="submit"
            isrequired="true"
            className="mt-3 w-[200px] mb-4"
          ></Button>
        </form>
        <div>
          {isSignedin ? "Not a member yet? " : "Already have an account? "}
          <span
            className="cursor-pointer text-sky-500 font-[500] hover:underline"
            onClick={() => {
              navigate(`/user/${isSignedin ? "signup" : "signin"}`);
              setIsSignedin(!isSignedin);
            }}
          >
            Click here
          </span>
        </div>
      </div>
    </>
  );
};
