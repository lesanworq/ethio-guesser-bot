const { Telegraf } = require("telegraf");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("EthioGuesser Bot is running!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Fake server is listening on port ${PORT}`);
});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const PLAY_URL = "https://ethioguesser.lesymesfin.workers.dev/";

bot.start(async (ctx) => {
  try {
    await ctx.setChatMenuButton({
      type: "web_app",
      text: "Play Game",
      web_app: { url: PLAY_URL },
    });
  } catch (error) {
    console.log("Could not set menu button:", error);
  }

  await ctx.replyWithPhoto(
    { source: "./EthioGuesser_Profile_2.jpg" },
    {
      caption: `🇪🇹 *EthioGuesser*

Can you guess these places in Ethiopia?

🎯 Play • Guess • Learn
🏆 Join the challenge`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "▶️ Play Now",
              web_app: { url: PLAY_URL },
              style: "success",
            },
          ],
          [
            {
              text: "👥 Challenge a Friend",
              switch_inline_query: "",
            },
          ],
        ],
      },
    }
  );
});

bot.launch();
console.log("EthioGuesser Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
