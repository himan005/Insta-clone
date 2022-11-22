import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-200 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>InstaClone App</title>
        <link rel="icon" href="https://links.papareact.com/jjm" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
};

export default Home;
