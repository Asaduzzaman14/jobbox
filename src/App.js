import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { setUser } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";

function App() {

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.auth)
  console.log(isLoading)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        dispatch(setUser(user))
      }
    })

  }, [])

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
