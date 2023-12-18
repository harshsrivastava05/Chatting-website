import { Form } from "./modules/form";
import "./App.css";
import { Dashboard } from "./modules/dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Protectedroutes = ({ children }) => {
  const isloggedin = localStorage.getItem("user: token") !== null || true;

  if (!isloggedin) {
    return <Navigate to={"/user/signup"} />;
  }

  return children;
};

function App() {
  return (
    <div className="bg-[#d7e3ff] h-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route path="/user/signup" element={<Form signedin={false} />} />
          <Route path="/user/register" element={<Form signedin={false} />} />
          <Route path="/user/signin" element={<Form signedin={true} />} />
          <Route
            path="/user/dashboard"
            element={
              <Protectedroutes>
                <Dashboard />
              </Protectedroutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
