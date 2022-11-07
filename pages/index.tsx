import prisma from "../lib/prisma";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import ListTwitt from "../components/ListTwitt";
import { TwittType } from "../components/Twitt";
import TwittForm from "../components/TwittForm";

const style = {
  wrapper: `bg-[#2D242F] text-white select-none flex flex-col justify-start`,
};

type Props = {
  twitts: TwittType[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>zkTwitt</title>
      </Head>
      <div className={style.wrapper}>
        <Header />
        <TwittForm />
        <ListTwitt twitts={props.twitts} />
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  let twitts = await prisma.twitt.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  twitts = JSON.parse(JSON.stringify(twitts));

  return {
    props: { twitts },
  };
}
