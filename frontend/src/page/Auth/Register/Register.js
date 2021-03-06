import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeDefault,
  setChangeRegister,
  setPostRegis,
} from "../../../React-redux/Reducer/ReducerOauth/ReduxAuth";
import toast, { Toaster } from "react-hot-toast";
import { postRegis } from "../../../utils/FetchData";
import { BACK_DEFAULT_CHANGE } from "../../../React-redux/ActionType/Type";

const Register = () => {
  const dispatch = useDispatch();

  const formRegis = useSelector((state) => state.Oauth.user);
  const { nama, password, email, confirmPassword } = formRegis;

  // ==== USE STATE ====
  const [wrong, setWrong] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setWrong(true);
      setLoading(false);
    } else {
      setWrong(false);
      let data = {
        nama: nama,
        password: password,
        email: email,
      };
      postRegis(data)
        .then((res) => {
          setLoading(false);
          dispatch(setChangeDefault(nama, confirmPassword, email, password));
          toast.success("login successful, check email for verification");
        })
        .catch((errors) => {
          errors.response.data.errors.map((item) => {
            toast.error(item.msg);
          });
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex bg-primary text-primary dark:bg-darkCol items-center w-full h-screen">
      <div className="flex w-full items-center justify-center px-[25px]">
        <Toaster />
        <form className="flex  justify-center flex-col lg:w-[30%] sm:w-[50%] w-full rounded-md p-3 lg:h-[65vh] dark:bg-navCol bg-slate-200">
          <h1 className="text-center text-semibold text-[1.2rem] text-black dark:text-white">
            Register
          </h1>
          <div className="flex flex-col mb-3">
            <label className="text-black font-medium dark:text-white text-sm">
              Username
            </label>
            <input
              value={nama}
              onChange={(e) =>
                dispatch(setChangeRegister("nama", e.target.value))
              }
              className="bg-ligthDark dark:bg-primary w-full h-10 px-3 py-2 rounded-lg text-black dark:text-white placeholder:text-slate-400"
              type="text"
              placeholder="Enter you username"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-black dark:text-white font-medium text-sm">
              Email
            </label>
            <input
              value={email}
              onChange={(e) =>
                dispatch(setChangeRegister("email", e.target.value))
              }
              className="bg-ligthDark dark:bg-primary  w-full h-10 px-3 py-2 rounded-lg text-black dark:text-white placeholder:text-slate-400"
              type="email"
              placeholder="Enter you email"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-black dark:text-white font-medium text-sm ">
              Password
            </label>
            <input
              value={password}
              onChange={(e) =>
                dispatch(setChangeRegister("password", e.target.value))
              }
              className="text-black dark:text-white bg-ligthDark dark:bg-primary w-full h-10 px-3 py-2 rounded-lg  placeholder:text-slate-400 "
              type="password"
              placeholder="Enter you password"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label className="text-black dark:text-white font-medium text-sm">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                dispatch(setChangeRegister("confirmPassword", e.target.value));
              }}
              className="bg-ligthDark dark:bg-primary w-full h-10 px-3 py-2 peer text-black dark:text-white placeholder:text-slate-400 rounded-lg"
              type="password"
              placeholder="Enter you password"
            />
            {wrong && (
              <p className=" peer-invalid:visible pl-2 pt-2 text-sm text-red-500">
                ! Ups confirm password not same
              </p>
            )}
          </div>

          <button
            onClick={submitRegister}
            className={
              loading
                ? "cursor-wait dark:bg-darkBlue flex items-center justify-center rounded-full hover:bg-blue-400 hover:text-white h-[40px]"
                : "dark:bg-darkBlue bg-darkBlue flex items-center justify-center rounded-full hover:bg-blue-400 hover:text-white h-[40px]"
            }
            type="submit"
            placeholder="Submit"
          >
            {loading && (
              <svg
                role="status"
                className="w-3 h-3 mr-1  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
