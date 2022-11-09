import prisma from "../../lib/prisma";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import { TwittType } from "../../components/Twitt";
import ListTwitt from "../../components/ListTwitt";

const style = {
  wrapper: `bg-[#2D242F] text-white select-none flex flex-col justify-start`,
};

type Props = {
  myTwitts: TwittType[] | [];
};

const Profile: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>zkTwitt - Profile</title>
      </Head>
      <div className={style.wrapper}>
        <Header />
        <ListTwitt twitts={props.myTwitts} />
      </div>
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentAddr = context.query.addr;
  if (!currentAddr || currentAddr === "") {
    return {
      props: {},
    };
  }
  let myTwitts = await prisma.twitt.findMany({
    where: {
      authorAddr: currentAddr as string,
    },
  });

  myTwitts = JSON.parse(JSON.stringify(myTwitts));

  return {
    props: { myTwitts },
  };
};
