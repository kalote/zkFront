import React, { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { TwittContext } from "../context/twittContext";

const style = {
  wrapper: `fixed w-[44rem] flex-shrink-0 rounded-2xl bg-[#392b3d] p-4 drop-shadow-lg`,
  content: `relative flex items-start`,
  imgProfile: `inline-block h-10 w-10 rounded-full`,
  textareaBlock: `ml-3 w-full`,
  textareaField: `w-full p-4 text-black focus:outline-none`,
  button: `h-10 rounded-full bg-[#E2A472] px-4 font-semibold text-black hover:bg-[#dd9258] focus:outline-none`,
  buttonContainer: `flex justify-end`,
  disabled: `disabled:opacity-25`,
  loader: `absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#333] opacity-25 rounded-2xl`,
};

const TwittForm = () => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentAccount, balance, checkIfBalanceIsPositive } = useContext(
    TwittContext
  ) as TwittContext;

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (checkIfBalanceIsPositive()) {
      try {
        const body = { currentAccount, content };
        await fetch(`/api/twitt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        {isLoading && (
          <div className={style.loader}>
            <BeatLoader size={15} loading={true} color={"#fff"} />
          </div>
        )}
        <div>
          <img
            className={style.imgProfile}
            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
            alt=""
          />
        </div>
        <div className={style.textareaBlock}>
          <form onSubmit={submitForm}>
            <textarea
              placeholder="What's up?"
              className={style.textareaField}
              onChange={(e) => setContent(e.target.value)}
              maxLength={255}
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
  );
};

export default TwittForm;
