import { PluginRegistrationObject <% if (cors) { -%>, RouteAdditionalConfigurationOptions<% } -%> } from "hapi";
import { <% if (cors) { -%>hapiPayPal,<% } -%> hapiPayPalGlueRegistration } from "hapi-paypal";

/* Uses default configuration from hapi-paypal which is all routes and all webhooks.  You can configure yourself by creating the instance and exporting it as default instead */
// https://github.com/trainerbill/hapi-paypal/blob/master/src/glue/index.ts
<% if (webhookHandler) { -%>
hapiPayPal.routes.get("paypal_webhooks_listen").custom = async (request, reply, error, response) => {
    // Handle webhooks here
    // tslint:disable-next-line:no-console
    console.log(request.payload);
    reply('Got It!');
};
<% } -%>

<% if (cors) { -%>
hapiPayPal.routes.forEach((route) => (route.config as RouteAdditionalConfigurationOptions).cors = true);
<% } -%>
export default [hapiPayPalGlueRegistration];
