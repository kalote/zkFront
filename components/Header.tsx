import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { TwittContext } from "../context/twittContext";
import { useRouter } from "next/router";

const styles = {
  wrapper: `pt-4 w-full flex justify-between items-center fixed bg-[#2D242F] drop-shadow-lg`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-xl font-semibold cursor-pointer rounded-3xl text-[#E2A472]`,
  activeItem: `bg-[#20242A]`,
  buttonContainer: `flex w-1/4 items-center justify-end`,
  button: `flex flex-col bg-[#191B1F] rounded-3xl mx-2 font-semibold text-xl cursor-pointer`,
  buttonPadding: `px-4 py-2`,
  buttonTextContainer: `h-8 flex items-center text-[#E2A472]`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#E2A472]`,
};

const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const { connectWallet, currentAccount, balance } = useContext(
    TwittContext
  ) as TwittContext;

  useEffect(() => {
    if (!currentAccount) return;
    setUsername(formatAccount(currentAccount));
  }, [currentAccount]);

  const formatAccount = (addr: string): string => {
    return `${addr.substring(0, 5)}...${addr.slice(-4)}`;
  };

  const handleClick = (where: string) => {
    router.push(`${where}?addr=${currentAccount}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerLogo}>
        <Image src={logo} alt="uniswap" height={83} width={323} />
      </div>
      <div className={styles.nav}>
        <div className={styles.navItemsContainer}>
          <div
            onClick={() => handleClick("/")}
            className={`${styles.navItem} ${
              router.pathname === "/" && styles.activeItem
            }`}
          >
            NewsFeed
          </div>
          <div
            onClick={() => handleClick("/profile")}
            className={`${styles.navItem} ${
              router.pathname === "/profile" && styles.activeItem
            }`}
          >
            Profile
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {currentAccount ? (
          <div className={`${styles.button} ${styles.buttonPadding}`}>
            <div className={styles.buttonTextContainer}>{username}</div>
            {balance && <p>{balance} ZTW</p>}
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${styles.button} ${styles.buttonPadding}`}
          >
            <div className={`${styles.buttonAccent} ${styles.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
