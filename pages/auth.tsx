import axios from "axios";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Input from "@/components/input";
// import { useRouter } from "next/router";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { getSession, signIn } from 'next-auth/react';


const Auth = () => {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const loginUser = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        // redirect: false,
        callbackUrl: "/profiles",
      });
      // router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const registerUser = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      loginUser();
    } catch (error) {
      console.log(error);
    }
  }, [email, loginUser, name, password]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-70">
        <nav className="px-12 py-5">
          <Image
            className="h-12"
            width={100}
            height={48}
            src="/images/logo.png"
            alt="Logo"
          />
        </nav>

        <div className="flex justify-center">
          <div className="px-16  py-16 self-center mt-2 lg:W-2/5 lg:max-w-md rounded-md w-full bg-black bg-opacity-70">
            <h2 className="text-white text-4xl mb-8 font-semibold ">
              {variant == "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "register" ? (
                <Input
                  label="Username"
                  onChange={(event: {
                    target: { value: React.SetStateAction<string> };
                  }) => setName(event.target.value)}
                  id="name"
                  type="name"
                  value={name}
                />
              ) : null}

              <Input
                label="email"
                onChange={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => setEmail(event.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="password"
                onChange={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => setPassword(event.target.value)}
                id="password"
                type="password "
                value={password}
              />
            </div>
            <button
              onClick={variant == "login" ? loginUser : registerUser}
              className="py-3 capitalize bg-red-600 text-white rounded-none w-full mt-10 hover:bg-red-700 transition"
            >
              {variant == "login" ? "login" : "sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={32} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={32} />
              </div>
            </div>
            <p className="mt-12 mr-5 text-neutral-500">
              {variant == "login"
                ? "First Time Here?"
                : "Already have an Account ?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant == "register" ? "Sign In" : "Create an Account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
