// vite.config.js
import { defineConfig } from "file:///C:/Users/Shubhranshu%20Sanjeev/Documents/ReactPrac/hackathon/technicAi/node_modules/vite/dist/node/index.js";
import basicSsl from "file:///C:/Users/Shubhranshu%20Sanjeev/Documents/ReactPrac/hackathon/technicAi/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import react from "file:///C:/Users/Shubhranshu%20Sanjeev/Documents/ReactPrac/hackathon/technicAi/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
var vite_config_default = defineConfig({
  // plugins: [react(), basicSsl(), {
  plugins: [react(), {
    name: "configure-response-headers",
    configureServer: (server) => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://172.18.226.146:5173");
        next();
      });
    }
  }],
  server: {
    host: "172.18.226.146",
    cors: true,
    origin: "http://172.18.226.146:5173",
    headers: { "Access-Control-Allow-Origin": "http://172.18.226.146:5173" },
    // https: { cert: fs.readFileSync("./backend/cert.pem"), key: fs.readFileSync("./backend/key.pem") }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTaHViaHJhbnNodSBTYW5qZWV2XFxcXERvY3VtZW50c1xcXFxSZWFjdFByYWNcXFxcaGFja2F0aG9uXFxcXHRlY2huaWNBaVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcU2h1YmhyYW5zaHUgU2FuamVldlxcXFxEb2N1bWVudHNcXFxcUmVhY3RQcmFjXFxcXGhhY2thdGhvblxcXFx0ZWNobmljQWlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1NodWJocmFuc2h1JTIwU2FuamVldi9Eb2N1bWVudHMvUmVhY3RQcmFjL2hhY2thdGhvbi90ZWNobmljQWkvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLGJhc2ljU3NsKCkse1xuICAgIG5hbWU6ICdjb25maWd1cmUtcmVzcG9uc2UtaGVhZGVycycsXG4gICAgY29uZmlndXJlU2VydmVyOiBzZXJ2ZXIgPT4ge1xuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgoX3JlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsJ2h0dHBzOi8vMTcyLjE2LjI0MC4xMzY6NTE3MycpO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1dLFxuICBzZXJ2ZXI6e2hvc3Q6JzE3Mi4xNi4yNDAuMTM2Jyxjb3JzOnRydWUsb3JpZ2luOidodHRwczovLzE3Mi4xNi4yNDAuMTM2OjUxNzMnLFxuICAgICAgICAgIGhlYWRlcnM6eydBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOidodHRwczovLzE3Mi4xNi4yNDAuMTM2OjUxNzMnfSxcbiAgICAgICAgICBodHRwczp7Y2VydDpmcy5yZWFkRmlsZVN5bmMoJy4vYmFja2VuZC9jZXJ0LnBlbScpLGtleTpmcy5yZWFkRmlsZVN5bmMoJy4vYmFja2VuZC9rZXkucGVtJyl9fSxcbiAgXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4WSxTQUFTLG9CQUFvQjtBQUMzYSxPQUFPLGNBQWM7QUFDckIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sUUFBUTtBQUVmLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUUsU0FBUyxHQUFFO0FBQUEsSUFDM0IsTUFBTTtBQUFBLElBQ04saUJBQWlCLFlBQVU7QUFDekIsYUFBTyxZQUFZLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztBQUMxQyxZQUFJLFVBQVUsK0JBQThCLDZCQUE2QjtBQUN6RSxhQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQztBQUFBLEVBQ0QsUUFBTztBQUFBLElBQUMsTUFBSztBQUFBLElBQWlCLE1BQUs7QUFBQSxJQUFLLFFBQU87QUFBQSxJQUN2QyxTQUFRLEVBQUMsK0JBQThCLDhCQUE2QjtBQUFBLElBQ3BFLE9BQU0sRUFBQyxNQUFLLEdBQUcsYUFBYSxvQkFBb0IsR0FBRSxLQUFJLEdBQUcsYUFBYSxtQkFBbUIsRUFBQztBQUFBLEVBQUM7QUFFckcsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
