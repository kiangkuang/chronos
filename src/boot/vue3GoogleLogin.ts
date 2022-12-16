import { boot } from 'quasar/wrappers';
import vue3GoogleLogin from 'vue3-google-login';

export default boot(async ({ app }) => {
  app.use(vue3GoogleLogin, {
    clientId: process.env.GOOGLE_API_CLIENT_ID,
  });
});
