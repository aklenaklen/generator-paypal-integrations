import { PluginRegistrationObject } from "hapi";
import {
    hapiIntacctGlueRegistration,
    hapiPayPalGlueRegistration,
    hapiPayPalIntacctInvoicingGlueRegistration,
} from "hapi-middleman-paypal-intacct";

const plugins = [
    hapiIntacctGlueRegistration,
    hapiPayPalGlueRegistration,
    hapiPayPalIntacctInvoicingGlueRegistration,
];

export default plugins;
