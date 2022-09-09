import { TextMessage, Config } from "./text-message";

export const createTextMessage = (config: Config) => new TextMessage(config);
