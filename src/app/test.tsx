import React, { useEffect } from "react";
import { api } from "~/trpc/react";

const test = () => {
  //--------------------------creating user-----------------------------
  // const createUser = api.user.create.useMutation({
  //   onSuccess: (data) => {
  //     console.log("Mutation successful:", data);
  //   },
  //   onError: (error) => {
  //     console.error("Mutation failed:", error);
  //   },
  // });
  // useEffect(() => {
  //   const response = createUser.mutate({
  //     first_name: "Harshit",
  //     last_name: "Tibrewal112345672345",
  //     username: "Nox123456",
  //     email: "harshit@gmail.com",
  //     password: "H@#$%^123456",
  //   });
  //   console.log(response);
  // }, []);
  //------------------------getting user either based on id, username or email----------------------
  // const {
  //   data: getUserData,
  //   isSuccess: isGetUserSuccess,
  //   error: getUserError,
  //   isLoading: isGetUserLoading,
  // } = api.user.get.useQuery({});
  // if (isGetUserLoading) {
  //   return <h1>Is Loading</h1>;
  // }
  // if (isGetUserSuccess) {
  //   console.log(getUserData);
  // }
  // --------------------Get entire user data ----------------------------
  // const {
  //   data: getUserData,
  //   isSuccess: isGetUserSuccess,
  //   error: getUserError,
  //   isLoading: isGetUserLoading,
  // } = api.user.getAll.useQuery();

  // if (isGetUserLoading) {
  //   return <h1>Is Loading</h1>;
  // }

  // if (isGetUserSuccess) {
  //   console.log(getUserData);
  // }
};

export default test;
