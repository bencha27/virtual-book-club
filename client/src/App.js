// Import components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import ViewPosts from "./components/ViewPosts";

// Import styles
// import './App.css';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Home /> */}
      <Signup />
      {/* <CreatePost /> */}
      {/* <ViewPosts /> */}
    </div>
  );
}