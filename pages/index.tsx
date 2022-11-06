import prisma from "../lib/prisma";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import ListTwitt from "../components/ListTwitt";
import { TwittProps } from "../components/Twitt";

const style = {
  wrapper: `bg-[#2D242F] text-white select-none flex flex-col justify-start`,
};

type Props = {
  twitts: TwittProps[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>zkTwitt</title>
      </Head>
      <div className={style.wrapper}>
        <Header />
        <ListTwitt twitts={props.twitts} />
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const twitts = await prisma.twitt.findMany();

  return {
    props: { twitts },
  };
}
