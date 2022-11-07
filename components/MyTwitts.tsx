import React from "react";
import Twitt, { TwittProps } from "./Twitt";

const styles = {
  wrapper: `flex items-start justify-center`,
  content: `w-[44rem] border-[#E2A472]`,
  ul: `list-none`,
};

type ListProps = {
  twitts: TwittProps[];
};

const MyTwitts: React.FC<ListProps> = (props) => {
  console.log("props myTwitt");
  console.log(props);
  return (
    <main role="main" className={styles.wrapper}>
      <div className={styles.content}>
        <section className="mt-40">
          <ul className={styles.ul}>
            <Twitt />
            <Twitt />
            <Twitt />
            <Twitt />
          </ul>
        </section>
      </div>
    </main>
  );
};

export default MyTwitts;
