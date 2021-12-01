import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Header from "../../components/header";
import styles from "./index.module.css";
import { selectSession } from "../../lib/redux/slices/sessionSlice";

function Profile() {
  return (
    <div className={`${styles["body"]}`}>
      <Header
        menulinks={[
          { href: "/", name: "Home" },
          { href: "/orders/", name: "Orders" },
          { href: "/profile/", name: "Profile" },
          { href: "/#", name: "Setting" }
        ]}
      />
      <div className={`${styles["container"]} `}>
        <h1 className={`${styles["title"]} `}>Profile Information</h1>
        <input
          className={`${styles["input"]} `}
          type="text"
          placeholder="First Name"
        ></input>
        <input
          className={`${styles["input"]} `}
          type="text"
          placeholder="Last Name"
        ></input>
        <input
          className={`${styles["input"]} `}
          type="text"
          placeholder="School"
        ></input>
        <input
          className={`${styles["input"]} `}
          type="text"
          placeholder="Major"
        ></input>
        <input
          className={`${styles["input"]} `}
          type="text"
          placeholder="Degree"
        ></input>
        <input
          className={`${styles["input"]} `}
          type="text"
          placeholder="Current Position"
        ></input>
        <button className={`${styles["button"]} `}>Submit</button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { token } = useSelector(selectSession);
  const router = useRouter();

  if (typeof window !== "undefined" && !token) {
    router.push("/login/");
    return <div>Redirecting...</div>;
  }

  return <Profile />;
}
