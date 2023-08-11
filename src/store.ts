import { action, Action, createStore } from "easy-peasy";
import {
  Config,
  Inventory,
  ItemInfo,
  Pool,
  SystemInfo,
  UserData,
  UserQuest,
} from "./gamefoxSDK";

export interface StoreModel {
  systemInfo: SystemInfo | null;
  setSystemInfo: Action<StoreModel, SystemInfo>;
  user: UserData | null;
  setUser: Action<StoreModel, UserData>;
  config: Config | null;
  setConfig: Action<StoreModel, Config>;
  inventory: Inventory | null;
  setInventory: Action<StoreModel, Inventory>;
  userItems: ItemInfo[];
  setUserItems: Action<StoreModel, ItemInfo[]>;
  quests: UserQuest[];
  setQuests: Action<StoreModel, UserQuest[]>;
  pool: Pool;
  setPool: Action<StoreModel, Pool>;
}

const store = createStore<StoreModel>({
  systemInfo: null,
  user: null,
  config: null,
  inventory: null,
  userItems: [],
  quests: [],
  pool: [],
  setSystemInfo: action((state, payload) => {
    state.systemInfo = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setConfig: action((state, payload) => {
    state.config = payload;
  }),
  setInventory: action((state, payload) => {
    state.inventory = payload;
  }),
  setUserItems: action((state, payload) => {
    state.userItems = payload;
  }),
  setQuests: action((state, payload) => {
    state.quests = payload;
  }),
  setPool: action((state, payload) => {
    state.pool = payload;
  }),
});

export default store;
