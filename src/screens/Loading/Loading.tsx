import { BarLoader } from "react-spinners";
import { useState, useEffect } from "react";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const containerStyle = {
    backgroundImage: "url('../src/assets/backgroup.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "101vh",
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/play";
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <div
        style={containerStyle}
        className="flex flex-col items-center justify-center"
      >
        <img
          src="../src/assets/shinhan.png"
          alt="shinhan"
          className="w-[10rem]"
          style={{ position: "absolute", top: "30px" }}
        />
        <img
          src="../src/assets/textloading.png"
          alt="textloading"
          className="w-[50rem]"
          style={{ position: "absolute", top: "96px" }}
        />

        <img
          src="../src/assets/maybe.png"
          alt="maybe"
          className="w-[9rem] ml-36 "
          style={{ position: "absolute", top: "270px" }}
        />
        <img
          src="../src/assets/bird.png"
          alt="maybe"
          className="w-[5rem] "
          style={{ position: "absolute", top: "290px", left: "120px" }}
        />
        <img
          src="../src/assets/logobackgroup.png"
          alt="logobackgroup"
          className="text-center  w-[24em]"
          style={{ position: "absolute", top: "370px" }}
        />
        <div
          className="w-[60vw] "
          style={{ position: "absolute", top: "540px" }}
        >
          <BarLoader
            color="#848CEE"
            className=" ml-5"
            width={280}
            height={10}
            cssOverride={{
              borderRadius: 50,
              backgroundColor: "white",
              marginLeft: "-10px",
            }}
          />
          <h1 className="text-center text-2xs ml-3" style={{ color: "#fff" }}>
            Chờ chút nhé!
          </h1>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
