import { app } from "./app/server.js";
import { APP_PORT } from "./configs/constanta-config.js";

app.listen(APP_PORT || 3000, () => {
  console.log(`APP RUNNING ON PORT ${APP_PORT}`);
});
