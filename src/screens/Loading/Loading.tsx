import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appConfig from "../../config";
import gamefoxSDK from "../../gamefoxSDK";
import {
  useConfig,
  useInventory,
  useQuest,
  useUser,
  useItems,
  useSystemInfo,
  usePool,
} from "../../hooks";
// import { ASSETS } from '../../utils/assetUtils';
import classes from "./loading.module.css";

type Props = {
  //
};

export const LoadingScreen: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [inited, setInited] = useState(false);
  const [loadedAssets, setLoadedAssets] = useState(false);

  const [, setUser] = useUser();
  const [, getConfig] = useConfig();
  const [, getInventory] = useInventory();
  const [, getItems] = useItems();
  const [, getQuests] = useQuest();
  const [, getSystemInfo] = useSystemInfo();
  const [, getPool] = usePool();

  const init = useCallback(async () => {
    // TODO: use configuration set from sdk
    try {
      if (appConfig.online) {
        await gamefoxSDK.init(appConfig.apiUrl);

        getConfig();
        const user = await gamefoxSDK.auth();
        setUser(user);
        await getInventory();
        await getItems();
        await getQuests();
        await getSystemInfo();
        await getPool();
      } else {
        // Offline usecase
        setUser({
          _id: "userId",
          data: {
            username: "Nguyen Van Dat",
          },
        });
        getConfig();
        await getInventory();
        await getItems();
        await getQuests();
        await getSystemInfo();
        await getPool();
      }
      setInited(true);
    } catch (error: any) {
      if (error?.message) {
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inited) {
      init();
    }
  }, [init, inited]);

  useEffect(() => {
    if (inited && loadedAssets) {
      console.log("navigate");
      navigate("/game", {
        replace: true,
      });
    }
  }, [navigate, inited, loadedAssets]);

  return (
    <div className={classes.container}>
      {/* <img src={ASSETS.LOADING_BG} alt="" className={classes['background']} /> */}
      {/* <img src={ASSETS.SOL_LOGO} alt="" className={classes['logo']} /> */}
      <div className={classes["loadingWrapper"]}>
        <span className="pro-regular">Chờ chút nhé!</span>
        <div className={classes["loadingBar"]}></div>
      </div>
    </div>
  );
};
