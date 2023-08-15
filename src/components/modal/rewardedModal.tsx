import React from "react";

function RewardedModal() {
  const containerStyle = {
    backgroundColor: "black",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100%",
    transform: "translateY(-30%)",
  };

  const handleButtonClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div style={containerStyle} className="flex items-center justify-center">
        <div style={{ position: "fixed", top: "287px" }}>
          <img
            style={imageStyle}
            src="../src/assets/bg_rewarded.png"
            alt=""
            className="w-full "
          />
        </div>
        <h1
          style={{
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            position: "fixed",
            top: "360px",
            transform: "translateY(-50%)",
          }}
        >
          Chúc mừng bạn lên cấp và <br /> nhận được hộp quà
        </h1>
        <img
          src="../src/assets/gift_box.png"
          alt=""
          //   className="w-[15em]"
          style={{
            position: "fixed",
            top: "453px",
            transform: "translateY(-30%)",
          }}
        />
        <h1
          style={{
            color: "#fff",
            fontSize: "15px",
            textAlign: "center",
            position: "fixed",
            top: "644px",
          }}
        ></h1>
        <img
          src="../src/assets/open_gift.png"
          alt=""
          style={{
            position: "fixed",
            top: "715px",
            transform: "translateY(-160%)",
          }}
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

export default RewardedModal;
