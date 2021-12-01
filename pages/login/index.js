import { useDispatch, useSelector } from "react-redux";
import {
  createSession,
  selectSession
} from "../../lib/redux/slices/sessionSlice";
import { useRouter } from "next/router";

function Row(props) {
  return (
    <div
      className={
        props.together
          ? "w-full flex flex-col justify-between mt-12 items-end"
          : "w-full flex flex-row justify-between"
      }
    >
      {props.children}
    </div>
  );
}

function FormControl(props) {
  return (
    <input
      className="block w-96 h-12 mx-0 my-4 text-base font-normal text-gray-500 bg-white bg-clip-padding border
    border-solid border-gray-100 rounded-md shadow-inner transition duration-200 ease"
    ></input>
  );
}

export default function Login() {
  const { token, logging } = useSelector(selectSession);
  const dispatch = useDispatch();
  const router = useRouter();

  if (token) {
    router.push("/orders/");
    return <div>Redirecting...</div>;
  }

  if (logging) {
    // show loading animation
    return <div>Redirecting...</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="w-auto h-full flex flex-col items-center justify-center">
        <h6 className="text-3xl font-semibold mb-4">Login</h6>
        <p className="mb-12 text-gray-400">
          Sign in to your account to continue.
        </p>

        <Row>
          <div>Email address</div>
        </Row>

        <Row>
          <FormControl />
        </Row>

        <Row>
          <div>Password</div>
          <div>show password</div>
        </Row>

        <Row>
          <FormControl />
        </Row>
        <div
          className="flex flex-row justify-center font-semibold text-white text-center align-middle
          select-none py-3 px-14 text-base rounded-md w-full bg-blue-300 shadow-none"
          onClick={() =>
            dispatch(
              createSession({
                email: "yucu@gmail.com",
                password: "1234"
              })
            )
          }
        >
          Sign in
        </div>

        <Row together>
          <div>
            <p>
              Not registered? <a>Create account</a>
            </p>
          </div>
          <div>
            <p>
              Forgot password? <a>Contact Us</a>
            </p>
          </div>
        </Row>
      </div>
    </div>
  );
}
