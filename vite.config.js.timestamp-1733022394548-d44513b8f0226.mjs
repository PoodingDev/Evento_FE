// vite.config.js
import path from "path";
import react from "file:///Users/cxaos/Evento_FE/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/cxaos/Evento_FE/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/cxaos/Evento_FE";
var vite_config_default = defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__vite_injected_original_dirname, "src/components")
    }
  },
  rollupOptions: {
    external: ["react-router-dom"]
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY3hhb3MvRXZlbnRvX0ZFXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvY3hhb3MvRXZlbnRvX0ZFL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9jeGFvcy9FdmVudG9fRkUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJDcm9zcy1PcmlnaW4tT3BlbmVyLVBvbGljeVwiOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICBcIkNyb3NzLU9yaWdpbi1FbWJlZGRlci1Qb2xpY3lcIjogXCJyZXF1aXJlLWNvcnBcIixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgY29tcG9uZW50czogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29tcG9uZW50c1wiKSxcbiAgICB9LFxuICB9LFxuICByb2xsdXBPcHRpb25zOiB7XG4gICAgZXh0ZXJuYWw6IFtcInJlYWN0LXJvdXRlci1kb21cIl0sXG4gIH0sXG4gIGV4dGVuZHM6IFtcbiAgICBcImFpcmJuYlwiLFxuICAgIFwiYWlyYm5iL2hvb2tzXCIsXG4gICAgXCJwbHVnaW46cmVhY3QvcmVjb21tZW5kZWRcIixcbiAgICBcInBsdWdpbjpAdHlwZXNjcmlwdC1lc2xpbnQvcmVjb21tZW5kZWRcIixcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvUCxPQUFPLFVBQVU7QUFDclEsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBRjdCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLDhCQUE4QjtBQUFBLE1BQzlCLGdDQUFnQztBQUFBLElBQ2xDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFlBQVksS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsZUFBZTtBQUFBLElBQ2IsVUFBVSxDQUFDLGtCQUFrQjtBQUFBLEVBQy9CO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
