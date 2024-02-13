import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Film, Tralier, SearchResult } from "./pages";
import store from './redux/store'
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/movie/:id" Component={Film} />
          <Route path="/trailer-page/:id" Component={Tralier} />
          <Route path="/search/:query" Component={SearchResult} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
