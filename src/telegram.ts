import axios from "axios";
import { config } from "./config";

export const getUniqueJoinLink = async () => {
  const result = await axios.post(
    `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/createChatInviteLink`,
    {
      chat_id: config.TELEGRAM_CHAT_ID,
      expire_date: new Date().getTime() + 60 * 60 * 1000,
      member_limit: 1,
    }
  );

  // TODO: Parse with zod
  return result.data.result.invite_link;
};
