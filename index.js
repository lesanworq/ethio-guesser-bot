const { Telegraf } = require("telegraf");
const http = require('http'); // Load the http module

// ---------------------------------------------------------
// 1. THE FAKE SERVER (To make Render happy)
// ---------------------------------------------------------
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('EthioGuesser Bot is running!');
});

// Render tells us which port to use via process.env.PORT
// If we are on our own computer, we use port 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Fake server is listening on port ${PORT}`);
});

// ---------------------------------------------------------
// 2. YOUR BOT CODE
// ---------------------------------------------------------
const bot = new Telegraf("8440444822:AAF64IUowmS6YgZuVqfxslnP-jY8AJ7BZTs");

bot.start(async (ctx) => {
  try {
    await ctx.setChatMenuButton({
      type: "web_app",
      text: "Play Game",
      web_app: { url: "https://ethioguesser.com" },
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
              web_app: { url: "https://ethioguesser.com" },
              style: "success"
            } 
          ],
          [ 
            { 
              text: "👥 Challenge a Friend", 
              switch_inline_query: "" 
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
