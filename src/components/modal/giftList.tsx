import React from "react";

function GiftList() {
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

  //   const handleButtonClick = () => {
  //     window.location.href = "/";
  //   };

  return (
    <div>
      <div style={containerStyle} className="flex items-center justify-center">
        <div
          style={{
            position: "fixed",
            top: "100px",
            right: "0",
            marginRight: "10px",
          }}
        >
          <img src="../src/assets/close.png" alt="" className="w-full " />
        </div>

        <div style={{ position: "fixed", top: "300px" }}>
          <img
            style={imageStyle}
            src="../src/assets/bg_gift.png"
            alt=""
            className="w-full "
          />
        </div>
        <h1
          style={{
            color: "#0B57DD",
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            position: "fixed",
            top: "230px",
            transform: "translateY(-100%)",
          }}
        >
          DANH SÁCH QUÀ
        </h1>
        <div
          className="left-10"
          style={{
            color: "#001C6C",
            fontSize: "16px",
            position: "fixed",
            top: "260px",
            transform: "translateY(-100%)",
          }}
        >
          Cơ cấu giải thưởng
        </div>
      </div>
    </div>
  );
}

export default GiftList;
