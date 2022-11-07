import React from "react";
import Twitt, { TwittType } from "./Twitt";

const styles = {
  wrapper: `flex items-start justify-center h-full`,
  content: `w-[44rem] border-[#E2A472]`,
  ul: `list-none`,
};

type ListProps = {
  twitts: TwittType[];
};

const ListTwitt: React.FC<ListProps> = (props) => {
  return (
    <main role="main" className={styles.wrapper}>
      <div className={styles.content}>
        <section className="mt-24">
          <ul className={styles.ul}>
            {props.twitts.map((twitt: TwittType, index) => (
              <div key={index}>
                <Twitt {...twitt} />
              </div>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default ListTwitt;
