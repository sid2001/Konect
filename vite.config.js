import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react'
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(),basicSsl(),{
  plugins: [react(),{
    name: 'configure-response-headers',
    configureServer: server => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin',"http://143.110.242.49:8081");
        next();
      });
    } 
  }],
  server:{host:"143.110.242.49",cors:true,origin:"http://143.110.242.49:5173",
          headers:{'Access-Control-Allow-Origin':"http://143.110.242.49:8081"},
          // https:{cert:fs.readFileSync('./backend/cert.pem'),key:fs.readFileSync('./backend/key.pem')}
        },
  
})
