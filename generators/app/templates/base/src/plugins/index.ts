import { PluginRegistrationObject } from "hapi";
import { goodGlueRegistration  } from "./good";
<% if (paypalIntacct && paypalIntacct.indexOf("Invoicing") !== -1) { -%>
import paypalIntacctInvoicing from "./paypal-intacct-invoicing";
<% } -%>

const plugins = [
    goodGlueRegistration,
<% if (plugins.indexOf("PayPal-Intacct") !== -1) { -%>
    ...paypalIntacctInvoicing,
<% } -%>
];

export default plugins;
