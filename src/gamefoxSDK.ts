import axios from "axios";
import * as uuid from "uuid";

const OVERLAY_ID = "__sdk_debug_overlay";
const CONTAINER_ID = "__sdk_debug_container";
declare global {
  interface Window {
    GamefoxSDK?: AndroidGamefoxSDK;
    webkit?: { messageHandlers?: { GamefoxSDK?: IOSGamefoxSDK } };
  }
}

export type SDKMessage = {
  eventType: string;
  eventData?: unknown;
};

interface AndroidGamefoxSDK {
  onMessage: (message: string) => void;
}
interface IOSGamefoxSDK {
  postMessage: (message: string) => void;
}

let isShowing = false;
const messages: string[] = [];
const _toggleDebugScreen = () => {
  if (!isShowing) {
    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.style.backgroundColor = `rgba(0,0,0,0.5)`;
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.bottom = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.style.overflow = "auto";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.paddingTop = "40px";

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    if (messages.length) {
      messages.forEach((message) => {
        _addDebugMessage(message);
      });
    }

    isShowing = true;
  } else {
    isShowing = false;
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }
};

const _addDebugMessage = (debugMessage: string) => {
  const text = document.createElement("p");
  text.innerHTML = debugMessage;
  text.style.fontSize = "16px";
  text.style.color = "white";
  const messageContainer = document.getElementById(CONTAINER_ID);
  messageContainer?.appendChild(text);
  messages.push(debugMessage);
};

let messageHandler = (message: SDKMessage) => {
  console.log("Unhandled Message", JSON.stringify(message, null, 2));
};

const DEBUG_EVENTS = {
  ADD_DEBUG_MESSAGE: "ADD_DEBUG_MESSAGE",
  TOGGLE_DEBUG_SCREEN: "TOGGLE_DEBUG_SCREEN",
};

window.addEventListener(
  "message",
  (event) => {
    try {
      let message: SDKMessage = JSON.parse(event.data);
      if (message?.eventType === DEBUG_EVENTS.ADD_DEBUG_MESSAGE) {
        _addDebugMessage(JSON.stringify(event.data));
      } else if (message?.eventType === DEBUG_EVENTS.TOGGLE_DEBUG_SCREEN) {
        _toggleDebugScreen();
      } else {
        messageHandler(message);
      }
    } catch (e: any) {
      return;
    }
  },
  false
);

enum ItemUsageType {
  /** With transactions */
  RESOURCES = "RESOURCES",
  /** Ticket */
  TICKET = "TICKET",
  /** Item with metadata */
  ITEM = "ITEM",
  /** No use */
  NONE = "NONE",
}

export type SKDParams = {
  templateKey: string;
  campaignId: string;
  token: string;
  inset?: { top: number; right: number; bottom: number; left: number };
};

export type SystemInfo = {
  currentTime: string;
};
export type Config = {
  [key: string]: any;
};
export type GameInstance = {
  gameId: string;
  config: { [key: string]: any };
};
export type UserData = {
  _id: string;
  data: { [key: string]: any };
};
export type UserQuest = {
  questId: string;
  userQuestId: string;
  name: string;
  description: string;
  goal: number;
  progress: number;
  progressAt: string;
  claimed: boolean;
  claimedAt: string;
  repeat?: {
    amount: number;
    timeAmount: number;
    timeUnit: string;
  };
};
export type Inventory = {
  id: string;
  type: string;
  resources: { [key: string]: number };
  items: {
    id: string;
    itemId: string;
    type: string;
    data: any;
    createdAt: string;
  }[];
  tickets: { id: string; itemId: string; type: string }[];
};
export type Reward = {
  amount?: number;
  itemId: string;
  itemType: string;
};
export type ItemInfo = {
  id: string;
  type: string;
  data: { [key: string]: any };
  usageType: ItemUsageType;
};
export type Pool = {
  createdAt: string;
  endTime: string;
  itemId: string;
  itemType: string;
  name: string;
  startTime: string;
  status: string;
  weight: number;
  unclaimed?: number;
  remaining?: number;
  workingTimeAmount?: number;
}[];

const sdkParams = {} as SKDParams;
const instanceConfig: Config = {};
let apiUrl = "";
let devMode = false;

type MockupData = {
  pools: Pool[];
  user: UserData;
  items: ItemInfo[];
  userQuests: UserQuest[];
  gameInstance: GameInstance;
  instanceConfig: Config;
  systemInfo: SystemInfo;
  inventory: Inventory;
  reward: Reward;
};

let _mockTicketItemId = uuid.v4();
let _mockItemId = uuid.v4();
let mockupData: MockupData = {
  pools: [],
  user: { _id: uuid.v4(), data: {} },
  instanceConfig: {},
  userQuests: [],
  items: [
    {
      id: _mockTicketItemId,
      type: "TEST_TICKET",
      data: {},
      usageType: ItemUsageType.TICKET,
    },
    {
      id: _mockItemId,
      type: "TEST_ITEM",
      data: {},
      usageType: ItemUsageType.ITEM,
    },
  ],
  gameInstance: { gameId: "test", config: {} },
  systemInfo: { currentTime: new Date().toISOString() },
  inventory: {
    id: uuid.v4(),
    items: [],
    tickets: [
      { id: uuid.v4(), itemId: _mockTicketItemId, type: "TEST_TICKET" },
      { id: uuid.v4(), itemId: _mockTicketItemId, type: "TEST_TICKET" },
      { id: uuid.v4(), itemId: _mockTicketItemId, type: "TEST_TICKET" },
    ],
    resources: {},
    type: "CAMPAIGN",
  },
  reward: { itemId: _mockItemId, itemType: "TEST_ITEM" },
};

const gamefoxSDK = {
  init: async (_apiUrl: string, _devMode?: boolean): Promise<GameInstance> => {
    apiUrl = _apiUrl;
    devMode = !!_devMode;
    // load configuration
    const supportedParams = ["templateKey", "campaignId", "token"];
    const otherParams = ["inset"];

    const searchParams = new window.URLSearchParams(window.location.search);
    const hashParams = new window.URLSearchParams(window.location.hash);

    for (let key of supportedParams) {
      (sdkParams as any)[key] = searchParams.get(key) || hashParams.get(key);
      if (
        !(sdkParams as any)[key] ||
        typeof (sdkParams as any)[key] !== "string"
      ) {
        throw new Error(`Missing ${key}!`);
      }
    }
    for (let key of otherParams) {
      let param = searchParams.get(key) || hashParams.get(key);
      if (key === "inset" && param) {
        const frags = param.split(";");
        const inset = {
          top: Number(frags[0]),
          right: Number(frags[1]),
          bottom: Number(frags[2]),
          left: Number(frags[3]),
        };
        sdkParams.inset = inset;
        document.documentElement.style.setProperty(
          "--inset-top",
          `${inset.top}px`
        );
        document.documentElement.style.setProperty(
          "--inset-right",
          `${inset.right}px`
        );
        document.documentElement.style.setProperty(
          "--inset-bottom",
          `${inset.bottom}px`
        );
        document.documentElement.style.setProperty(
          "--inset-left",
          `${inset.left}px`
        );
      } else {
        (sdkParams as any)[key] = param;
      }
    }

    if (devMode) {
      return { ...mockupData.gameInstance, config: instanceConfig };
    }
    if (sdkParams.campaignId === "test") {
      return { gameId: "test", config: instanceConfig };
    } else {
      const resp = await axios.get(
        `${apiUrl}/api/game/gameInstance/${sdkParams.templateKey}`
      );
      Object.keys(resp.data).forEach((key) => {
        instanceConfig[key] = resp.data[key];
      });
      return resp.data as GameInstance;
    }
  },
  auth: async (): Promise<UserData> => {
    if (devMode) {
      return mockupData.user;
    }
    const resp = await axios.get(`${apiUrl}/api/game/auth`, {
      headers: { "x-user-token": sdkParams.token },
    });
    return resp.data as UserData;
  },
  getSystemInfo: async (): Promise<SystemInfo> => {
    if (devMode) {
      return mockupData.systemInfo;
    }
    const resp = await axios.get(`${apiUrl}/api/game/systemInfo`, {
      headers: { "x-user-token": sdkParams.token },
    });
    return resp.data as SystemInfo;
  },
  getItems: async (): Promise<ItemInfo[]> => {
    if (devMode) {
      return mockupData.items;
    }
    const resp = await axios.get(`${apiUrl}/api/game/items`);
    return resp.data as ItemInfo[];
  },
  getUserQuests: async (): Promise<UserQuest[]> => {
    if (devMode) {
      return mockupData.userQuests;
    }
    const resp = await axios.get(`${apiUrl}/api/game/userQuests`, {
      headers: { "x-user-token": sdkParams.token },
    });
    return resp.data as UserQuest[];
  },
  getInventory: async (
    campaignId?: string,
    type: "CAMPAIGN" | "GLOBAL" = "CAMPAIGN"
  ): Promise<Inventory> => {
    if (devMode) {
      return { ...mockupData.inventory, type };
    }

    let _type = type;
    if (!campaignId) {
      _type = "GLOBAL";
    } else {
      _type = "CAMPAIGN";
    }
    let _campaignId = campaignId ? campaignId : sdkParams.campaignId;
    const resp = await axios.get(
      `${apiUrl}/api/game/inventory?type=${_type}&campaignId=${_campaignId}`,
      {
        headers: { "x-user-token": sdkParams.token },
      }
    );
    return resp.data as Inventory;
  },
  useTicket: async (ticketId: string, campaignId?: string) => {
    if (devMode) {
      const item = mockupData.items.find(
        (i) => i.type === mockupData.reward.itemType
      );
      if (!item) {
        throw new Error(
          `Items does not includes itemType: ${mockupData.reward.itemType}`
        );
      }
      if (item.usageType === ItemUsageType.TICKET) {
        mockupData.inventory.tickets.push({
          id: uuid.v4(),
          itemId: item.id,
          type: item.type,
        });
      } else if (item.usageType === ItemUsageType.RESOURCES) {
        mockupData.inventory.resources[item.type] +=
          mockupData.reward.amount || 100;
      } else if (item.usageType === ItemUsageType.ITEM) {
        mockupData.inventory.items.push({
          createdAt: new Date().toISOString(),
          data: item.data,
          id: uuid.v4(),
          itemId: mockupData.reward.itemId,
          type: mockupData.reward.itemType,
        });
      }
      return { ...mockupData.reward };
    }

    const resp = await axios.post(
      `${apiUrl}/api/game/useTicket`,
      {
        ticketId,
        campaignId: campaignId ? campaignId : sdkParams.campaignId,
      },
      {
        headers: { "x-user-token": sdkParams.token },
      }
    );
    return resp.data as Reward;
  },
  getPools: async (): Promise<Pool[]> => {
    if (devMode) {
      return mockupData.pools;
    }

    const resp = await axios.get(`${apiUrl}/api/game/pools`, {
      headers: { "x-user-token": sdkParams.token },
    });
    return resp.data as Pool[];
  },
  registerHandler: (handler: (message: SDKMessage) => void) => {
    messageHandler = handler;
  },
  postMessage: (message: SDKMessage) => {
    if (window.GamefoxSDK) {
      window.GamefoxSDK.onMessage(JSON.stringify(message));
    }
    if (window.webkit?.messageHandlers?.GamefoxSDK) {
      window.webkit.messageHandlers.GamefoxSDK.postMessage(
        JSON.stringify(message)
      );
    }
  },
  getParams: (): SKDParams => sdkParams,
  getInstanceConfig: () => instanceConfig,
  isShowingDebugScreen: () => isShowing,
  addDebugMessage: _addDebugMessage,
  toggleDebugScreen: _toggleDebugScreen,
  DEBUG_EVENTS,
  setMockupData: (data: Partial<MockupData>) => {
    mockupData = { ...mockupData, ...data };
  },
  getMockupData: (): MockupData => {
    return mockupData;
  },
};

export default gamefoxSDK;
