import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import ListTwitt from "../components/ListTwitt";

const style = {
  wrapper: `bg-[#2D242F] text-white select-none flex flex-col justify-start`,
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>zkTwitt</title>
      </Head>
      <div className={style.wrapper}>
        <Header />
        <ListTwitt />
      </div>
    </>
  );
};

export default Home;
