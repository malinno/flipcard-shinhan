import dayjs from "dayjs";
import { ActionCreator, createTypedHooks } from "easy-peasy";
import debounce from "lodash.debounce";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import config from "./config";
import { EMITTER_EVENTS } from "./constants";
import {
  dummyEkycQuests,
  dummyInventory,
  dummyItems,
  dummyPool,
  dummySystemInfos,
} from "./dummyData";
import gamefoxSDK, {
  Config,
  Inventory,
  ItemInfo,
  Pool,
  Reward,
  SystemInfo,
  UserData,
  UserQuest,
} from "./gamefoxSDK";
import { StoreModel } from "./store";
import eventEmitter from "./utils/eventEmitter";

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;

export const useTouchOutside = (): [
  MutableRefObject<HTMLDivElement | undefined>,
  string,
  (key: string) => void
] => {
  const nodeRef = useRef<HTMLDivElement>();
  const [currentRefKey, setCurrentRefKey] = useState("");

  useEffect(() => {
    const clickEvent = (() => {
      if ("ontouchstart" in document.documentElement === true) {
        return "touchstart";
      } else {
        return "mousedown";
      }
    })();

    const handleTouch = debounce((event: TouchEvent | MouseEvent) => {
      if (!nodeRef.current) {
        setCurrentRefKey("");
        return;
      }
      const target = event.target as any;
      if (target === nodeRef.current || nodeRef.current?.contains(target)) {
        return;
      } else {
        setCurrentRefKey("");
        nodeRef.current = undefined;
      }
    }, 0);

    window?.document?.addEventListener(clickEvent, handleTouch);
    return () => {
      window?.document?.removeEventListener(clickEvent, handleTouch);
    };
  }, []);

  return [nodeRef, currentRefKey, setCurrentRefKey];
};

export const useUser = (): [UserData | null, ActionCreator<UserData>] => {
  const user = useStoreState((state) => state.user);
  const setUser = useStoreActions((actions) => actions.setUser);

  return [user, setUser];
};

export const useConfig = (): [Config | null, () => Config] => {
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreActions((actions) => actions.setConfig);

  const getConfig = useCallback(() => {
    const cfg = gamefoxSDK.getInstanceConfig();
    setConfig(cfg);
    return cfg;
  }, [setConfig]);

  return [config, getConfig];
};

export const useInventory = (): [
  Inventory | null,
  () => Promise<Inventory>
] => {
  const inventory = useStoreState((state) => state.inventory);
  const setInventory = useStoreActions((actions) => actions.setInventory);

  const getInventory = useCallback(async () => {
    if (!config.online) {
      setInventory(dummyInventory);
      return dummyInventory;
    }

    const inventory = await gamefoxSDK.getInventory();
    inventory.items.sort((a, b) => {
      return dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix();
    });
    setInventory(inventory);
    eventEmitter.emit(
      EMITTER_EVENTS.UPDATE_NUMBER_OF_TICKETS,
      inventory.tickets.length
    );
    return inventory;
  }, [setInventory]);

  return [inventory, getInventory];
};

export const useItems = (): [ItemInfo[], () => Promise<ItemInfo[]>] => {
  const userItems = useStoreState((state) => state.userItems);
  const setUserItems = useStoreActions((actions) => actions.setUserItems);

  const getItems = useCallback(async () => {
    if (!config.online) {
      setUserItems(dummyItems);
      return dummyItems;
    }

    const items = await gamefoxSDK.getItems(true);
    setUserItems(items);
    return items;
  }, [setUserItems]);

  return [userItems, getItems];
};

export const useQuest = (): [UserQuest[], () => Promise<UserQuest[]>] => {
  const quests = useStoreState((state) => state.quests);
  const setQuests = useStoreActions((actions) => actions.setQuests);

  const getQuests = useCallback(async () => {
    if (!config.online) {
      setQuests(dummyEkycQuests);
      return dummyEkycQuests;
    }

    const quests = await gamefoxSDK.getUserQuests();
    setQuests(quests);
    return quests;
  }, [setQuests]);

  return [quests, getQuests];
};

export const useSystemInfo = (): [
  SystemInfo | null,
  () => Promise<SystemInfo>
] => {
  const systemInfo = useStoreState((state) => state.systemInfo);
  const setSystemInfo = useStoreActions((actions) => actions.setSystemInfo);

  const getSystemInfo = useCallback(async () => {
    if (!config.online) {
      setSystemInfo(dummySystemInfos);
      return dummySystemInfos;
    }

    const infos = await gamefoxSDK.getSystemInfo();
    setSystemInfo(infos);
    return infos;
  }, [setSystemInfo]);

  return [systemInfo, getSystemInfo];
};

export const useSpin = (): [
  (ticketId: string, campaignId?: string) => Promise<Reward>
] => {
  const spin = useCallback(async (ticketId: string, campaignId?: string) => {
    const reward = await gamefoxSDK.useTicket(ticketId, campaignId);
    return reward;
  }, []);

  return [spin];
};

export const usePool = (): [Pool, () => Promise<Pool>] => {
  const pool = useStoreState((state) => state.pool);
  const setPool = useStoreActions((actions) => actions.setPool);

  const getPool = useCallback(async () => {
    if (!config.online) {
      setPool(dummyPool);
      return dummyPool;
    }

    const pool = await gamefoxSDK.getPools();
    setPool(pool);
    return pool;
  }, [setPool]);

  return [pool, getPool];
};
