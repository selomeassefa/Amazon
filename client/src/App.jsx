import { useContext, useEffect } from "react";
import Router from "./Router";
import { DataContext } from "./components/DataProvider";
import { Type } from "./utility/action.type";
import { auth } from "./utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext); // eslint-disable-line

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="p-0 m-0 font-sans">
      <Router />
    </div>
  );
}

export default App;
