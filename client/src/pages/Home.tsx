import React from "react";
import Navigation from "../components/Navigation";
import HomeSection from "../components/HomeSection";

interface HomeProps {
  user: {
    sub: string;
    name?: string;
    email?: string;
    picture?: string;
  } | null;
  setUser: (user: any) => void;
}

const Home: React.FC<HomeProps> = ({ user, setUser }) => {
  return (
    <>
      <Navigation user={user} setUser={setUser} />
      <HomeSection />
    </>
  );
};

export default Home;
