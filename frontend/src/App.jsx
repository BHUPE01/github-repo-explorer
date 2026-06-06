import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import useGithub from "./hooks/useGithub";

const App = () => {
  const github = useGithub();
  const [searched, setSearched] = useState(false);

  const handleSearch = (username) => {
    setSearched(true);
    github.search(username);
  };

  const handleBack = () => {
    setSearched(false);
    github.reset();
  };

  if (!searched) {
    return <HomePage onSearch={handleSearch} loading={github.loading} />;
  }

  return (
    <ProfilePage
      {...github}
      onSearch={handleSearch}
      onBack={handleBack}
    />
  );
};

export default App;