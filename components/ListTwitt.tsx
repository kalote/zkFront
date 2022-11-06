import React from "react";
import Twitt, { TwittProps } from "./Twitt";
import TwittForm from "./TwittForm";

const styles = {
  wrapper: `flex items-start justify-center mt-24`,
  content: `w-[44rem] border-[#E2A472]`,
  ul: `list-none`,
};

type ListProps = {
  twitts: TwittProps[];
};

const ListTwitt: React.FC<ListProps> = (props) => {
  console.log("props listTwitt");
  console.log(props);
  return (
    <main role="main" className={styles.wrapper}>
      <div className={styles.content}>
        <section>
          <TwittForm />
        </section>
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

export default ListTwitt;
