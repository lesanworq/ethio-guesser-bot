const { Telegraf } = require("telegraf");

const bot = new Telegraf("8440444822:AAF64IUowmS6YgZuVqfxslnP-jY8AJ7BZTs");

bot.start(async (ctx) => {
  // 1. SET THE MENU BUTTON (Permanent button next to typing bar)
  try {
    await ctx.setChatMenuButton({
      type: "web_app",
      text: "Play",
      web_app: { url: "https://ethioguesser.com" },
    });
  } catch (error) {
    console.log("Could not set menu button:", error);
  }

  // 2. SEND THE PHOTO (With the new COLORED buttons)
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
              web_app: { url: "https://ethioguesser.com" },
              // ✨ NEW API 9.4 FEATURE:
              style: "success" // This turns the button GREEN 🟩
            } 
          ],
          [ 
            { 
              text: "🤽 Challenge a Friend", 
              switch_inline_query: "",
            } 
          ]
        ]
      }
    }
  );
});

bot.launch();
console.log("EthioGuesser Bot is running...");

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));