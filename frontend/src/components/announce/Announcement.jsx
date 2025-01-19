import "./ann.css";
import Marquee from "react-fast-marquee";
const Announcement = () => {
  return (
    <div className="annoucement">
      <Marquee>
        <div className="annoucement-text text1">
          <span> Super Deal! Free Shipping on Orders Over ₦100,000</span>
        </div>
        <div className="annoucement-text text2">
          <span>get more sales</span>
          <span>X-store the biggest online shop in Nigeria</span>
        </div>
        <div className="annoucement-text text2">
          <span>enjoy discounted fees for shopping online</span>
        </div>
      </Marquee>
    </div>
  );
};

export default Announcement;
