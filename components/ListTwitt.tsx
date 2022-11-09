import React from "react";
import Twitt, { TwittType } from "./Twitt";

const styles = {
  wrapper: `flex items-start justify-center h-full h-screen`,
  content: `w-[44rem] border-[#E2A472]`,
  ul: `list-none`,
  title: `text-xl text-center p-12`,
};

type ListProps = {
  twitts: TwittType[];
};

const ListTwitt: React.FC<ListProps> = (props) => {
  return (
    <main role="main" className={styles.wrapper}>
      <div className={styles.content}>
        <section className="mt-24">
          {props?.twitts?.length > 0 ? (
            <ul className={styles.ul}>
              {props.twitts.map((twitt: TwittType, index) => (
                <div key={index}>
                  <Twitt {...twitt} />
                </div>
              ))}
            </ul>
          ) : (
            <h2 className={styles.title}>
              You're not connected, or haven't posted any twitt yet!
            </h2>
          )}
        </section>
      </div>
    </main>
  );
};

export default ListTwitt;
