import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type IconProps = {
  addr: string;
};

const Icon: React.FC<IconProps> = ({ addr }) => {
  return <Jazzicon diameter={40} seed={jsNumberForAddress(addr)} />;
};

export default Icon;
