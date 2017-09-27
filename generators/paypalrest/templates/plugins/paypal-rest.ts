import { PluginRegistrationObject } from "hapi";
import { hapiPayPalGlueRegistration } from "hapi-paypal";

/* Uses default configuration from hapi-paypal which is all routes and all webhooks.  You can configure yourself by creating the instance and exporting it as default instead */
// https://github.com/trainerbill/hapi-paypal/blob/master/src/glue/index.ts

export default [hapiPayPalGlueRegistration];
