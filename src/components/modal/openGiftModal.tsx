import React from "react";

function OpenGiftModal() {
  const containerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.87)",
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
        <div
          style={{
            position: "fixed",
            top: "107px",
            right: "0",
            marginRight: "10px",
          }}
        >
          <img src="../src/assets/close.png" alt="" className="w-full " />
        </div>

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
            transform: "translateY(-60%)",
          }}
        >
          Bạn đã trúng Voucher
        </h1>
        <img
          src="../src/assets/got_it_voucher_3M.png"
          alt=""
          className="w-[15em]"
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
            transform: "translateY(-350%)",
          }}
        >
          LƯỢT CHƠI CÒN LẠI : 03
        </h1>
        <div
          className="flex"
          style={{
            textAlign: "center",
            position: "fixed",
            top: "644px",
          }}
        >
          <img
            src="../src/assets/continue_playing.png"
            alt=""
            className="cursor-pointer mr-4"
            style={{
              transform: "translateY(-50%)",
            }}
            onClick={handleButtonClick}
          />
          <img
            src="../src/assets/gift_baskets.png"
            alt=""
            className="cursor-pointer"
            style={{
              transform: "translateY(-50%)",
            }}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
}

export default OpenGiftModal;
