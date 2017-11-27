import { PluginRegistrationObject } from "hapi";
import {
    hapiIntacctGlueRegistration,
    hapiPayPalGlueRegistration,
    hapiPayPalIntacctInvoicingGlueRegistration,
} from "paypal-integrations-intacct";

const plugins = [
    hapiIntacctGlueRegistration,
    hapiPayPalGlueRegistration,
    hapiPayPalIntacctInvoicingGlueRegistration,
];

export default plugins;
