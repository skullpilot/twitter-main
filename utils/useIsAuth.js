import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSession } from "../lib/redux/slices/sessionSlice";

export const useIsAuth = () => {
  const { token, logging } = useSelector(selectSession);
  const router = useRouter();
  useEffect(() => {
    if (!token && !logging) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [token, logging]);
};
