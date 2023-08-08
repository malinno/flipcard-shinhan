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
        />
        <img
          src="../src/assets/logobackgroup.png"
          alt="logobackgroup"
          className="text-center mt-[50px] w-[24em]"
        />
        <div className="w-[60vw] mt-[50px]">
          <h1 className="text-center text-2xs" style={{ color: "#fff" }}>
            Chờ chút nhé!
          </h1>
          <BarLoader
            color="#f9d800"
            className="mt-1 ml-5"
            width={200}
            height={10}
            cssOverride={{ borderRadius: 20, backgroundColor: "white" }}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
