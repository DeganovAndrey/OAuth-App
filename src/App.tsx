import "./App.css";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <h2>Degan</h2>
      <Profile id={2} />
      <AuthForm />
    </div>
  );
}

export default App;
