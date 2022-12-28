//const { defineConfig } = require("@vue/cli-service");
import { defineConfig } from "@vue/cli-service";
//const GoogleFontsPlugin = require("google-fonts-webpack-plugin");
import GoogleFontsPlugin from "google-fonts-webpack-plugin";
defineConfig({
  devServer: {
    proxy: "https://code-duel.onrender.com/",
    clientLogLevel: "info",
  },
  transpileDependencies: ["vuetify"],
  entry: "index.js",
  /* ... */
  configureWebpack: {
    plugins: [
      new GoogleFontsPlugin({
        fonts: [
          { family: "Source Sans Pro" },
          { family: "Roboto", variants: ["400", "700italic"] },
          { family: "Chakra Petch" },
          /*ここにフォントを追加していく．もちろん上のRobotoとSourse sans proは消してよい*/
        ],
        /* ...options */
      }),
    ],
  },
});

//export default defineConfig
