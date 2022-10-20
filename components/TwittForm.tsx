import React from "react";

const style = {
  wrapper: `fixed w-[44rem] flex-shrink-0 rounded-2xl bg-[#392b3d] p-4 drop-shadow-lg`,
  content: `flex items-start`,
  imgProfile: `inline-block h-10 w-10 rounded-full`,
  textareaBlock: `ml-3 w-full`,
  textareaField: `w-full p-4 text-black focus:outline-none`,
  button: `h-10 rounded-full bg-[#E2A472] px-4 font-semibold text-black hover:bg-[#dd9258] focus:outline-none`,
  buttonContainer: `flex justify-end`,
};

const TwittForm = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div>
          <img
            className={style.imgProfile}
            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
            alt=""
          />
        </div>
        <div className={style.textareaBlock}>
          <form>
            <textarea
              placeholder="What's up?"
              className={style.textareaField}
            />
            <div className={style.buttonContainer}>
              <button type="submit" className={style.button}>
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
