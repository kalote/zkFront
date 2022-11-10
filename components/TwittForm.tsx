import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { TwittContext } from "../context/twittContext";
import { COST_OF_TWITT } from "../lib/constants";
import Icon from "./Icon";

const style = {
  container: `flex items-start justify-center mt-24 mb-16`,
  wrapper: `fixed w-[44rem] flex-shrink-0 rounded-2xl bg-[#392b3d] p-4 drop-shadow-lg`,
  content: `relative flex items-start`,
  imgProfile: `inline-block h-10 w-10 rounded-full`,
  textareaBlock: `ml-3 w-full`,
  textareaField: `w-full p-4 text-black focus:outline-none`,
  button: `h-10 rounded-full bg-[#E2A472] px-4 font-semibold text-black hover:bg-[#dd9258] focus:outline-none`,
  buttonContainer: `flex justify-end`,
  disabled: `disabled:opacity-25`,
  loader: `absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#333] opacity-50 rounded-2xl`,
};

const TwittForm = () => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentAccount, balance, checkIfBalanceIsEnough, twittOnChain } =
    useContext(TwittContext) as TwittContext;

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (checkIfBalanceIsEnough(COST_OF_TWITT)) {
      try {
        const body = { currentAccount, content };
        const twittCreated = await fetch(`/api/twitt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const twittData = await twittCreated.json();
        await twittOnChain(twittData.id);
        setContent("");
        setIsLoading(false);
        router.replace(router.asPath);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.content}>
          {isLoading && (
            <div className={style.loader}>
              <BeatLoader size={15} loading={true} color={"#fff"} />
            </div>
          )}
          <div>
            <Icon addr={currentAccount} />
          </div>
          <div className={style.textareaBlock}>
            <form onSubmit={submitForm}>
              <textarea
                placeholder="What's up?"
                className={style.textareaField}
                onChange={(e) => setContent(e.target.value)}
                maxLength={255}
                value={content}
              />
              <div className={style.buttonContainer}>
                <button
                  type="submit"
                  className={`${style.button} ${
                    !currentAccount || !balance ? style.disabled : ""
                  }`}
                  disabled={!currentAccount || !balance}
                >
                  zkTwitt (20 ZTW)
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwittForm;
