import { useEffect } from "react";
import AppLoader from "./AppLoader";
import { useAppDispatch } from "../redux/hooks";
import { useBootstrap } from "../hooks/useBootstrap";
import { logout, setUser } from "../redux/slices/userSlice";
import { adminLogout, setAdmin } from "../redux/slices/adminSlice";

export const AppBootstrap = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const bootstrap = useBootstrap();

  useEffect(() => {
    if (!bootstrap?.data) return;

    const { role, accessToken, user, admin } = bootstrap.data;

    if (role === "user" && user) {
      dispatch(setUser({ accessToken, user }));
    } else if (role === "admin" && admin) {
      dispatch(setAdmin({ accessToken, admin }));
    }
  }, [bootstrap?.data, dispatch]);

  useEffect(() => {
    if (bootstrap?.isError) {
      dispatch(logout());
      dispatch(adminLogout());
    }
  }, [bootstrap?.isError, dispatch]);

  if (bootstrap?.isLoading) {
    return (
      <AppLoader />
    );
  }

  return <>{children}</>;
};
