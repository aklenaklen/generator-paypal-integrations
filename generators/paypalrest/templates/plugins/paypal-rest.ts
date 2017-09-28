import { PluginRegistrationObject <% if (cors) { -%>, RouteAdditionalConfigurationOptions<% } -%> } from "hapi";
import { <% if (cors) { -%>hapiPayPal,<% } -%> hapiPayPalGlueRegistration } from "hapi-paypal";

/* Uses default configuration from hapi-paypal which is all routes and all webhooks.  You can configure yourself by creating the instance and exporting it as default instead */
// https://github.com/trainerbill/hapi-paypal/blob/master/src/glue/index.ts

<% if (cors) { -%>
hapiPayPal.routes.forEach((route) => (route.config as RouteAdditionalConfigurationOptions).cors = true);
<% } -%>
export default [hapiPayPalGlueRegistration];
