import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Import components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import User from "./pages/User";
import Posts from "./pages/Posts";
import PostSingle from './pages/PostSingle';
import PostForm from "./pages/PostForm";
// import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<User />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<PostSingle />} />
            <Route path="/create" element={<PostForm />} />
          </Routes>
        {/* <Footer loggedIn={loggedIn} /> */}
      </Router>
    </ApolloProvider>
  );
}