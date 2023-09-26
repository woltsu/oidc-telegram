import axios from "axios";
import { config } from "./config";
import z from "zod";

const telegramResponseSchema = z.object({
  result: z.object({
    invite_link: z.string(),
  }),
});

export const getUniqueJoinLink = async () => {
  const result = await axios.post(
    `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/createChatInviteLink`,
    {
      chat_id: config.TELEGRAM_CHAT_ID,
      expire_date: new Date().getTime() + 60 * 60 * 1000,
      member_limit: 1,
    }
  );

  const parsedResult = telegramResponseSchema.parse(result.data);
  return parsedResult.result.invite_link;
};
