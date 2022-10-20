import React from "react";
import Twitt from "./Twitt";
import TwittForm from "./TwittForm";

const styles = {
  wrapper: `flex items-start justify-center mt-24`,
  content: `w-[44rem] border-[#E2A472]`,
  ul: `list-none`,
};

const ListTwitt = () => {
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
