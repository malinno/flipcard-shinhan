import React, { useState, useEffect } from "react";
import PlayGame from "./GameCard";

export default function Flipcard() {
  const containerStyle = {
    backgroundImage: "url('../src/assets/play.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    width: "100vw",
    height: "100vh",
  };

  const [countdown, setCountdown] = useState(3);
  // Sử dụng useEffect để giảm giá trị của số đếm sau mỗi khoảng thời gian
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Mỗi lần giảm giá trị sau 1 giây (1000ms)
      return () => clearTimeout(timer); // Hủy bỏ timer khi component unmount
    }
  }, [countdown]);
  return (
    <div style={containerStyle}>
      <PlayGame />
      <div className="flex flex-col items-center justify-center">
        <img
          src="../src/assets/icon3.png"
          alt="oclockgame"
          className="w-[6em]"
          style={{ position: "fixed", top: "260px", zIndex: "1000" }}
        />
        <img
          src="../src/assets/icon2.png"
          alt="oclockgame"
          className="w-[6em]"
          style={{ position: "fixed", top: "260px", zIndex: "1000" }}
        />
        <img
          src="../src/assets/icon1.png"
          alt="oclockgame"
          className="w-[6em]"
          style={{ position: "fixed", top: "260px", zIndex: "1000" }}
        />
        <img
          src="../src/assets/oclockgame.png"
          alt="oclockgame"
          className="w-[14em]"
          style={{ position: "fixed", top: "310px" }}
        />
        <h1
          style={{
            color: "#FFF",
            position: "fixed",
            top: "307px",
            marginLeft: "147px",
            fontSize: "14px",
          }}
        >
          Bước: 15/30
        </h1>
        <div className="mr-[226px]">
          <img
            src="../src/assets/backgroupbutton.png"
            alt="backgroupbutton"
            className=" w-[14em]"
            style={{ position: "fixed", top: "760px" }}
          />
          <img
            src="../src/assets/point.png"
            alt="point"
            className=" w-[6em] mt-2 mx-3"
            style={{ position: "fixed", top: "760px" }}
          />
          <img
            src="../src/assets/level.png"
            alt="point"
            className=" w-[6em] ml-[8rem] mt-2  "
            style={{ position: "fixed", top: "760px", marginLeft: "113px" }}
          />
        </div>
      </div>
    </div>
  );
}
