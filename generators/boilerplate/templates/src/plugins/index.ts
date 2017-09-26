import { PluginRegistrationObject } from "hapi";
import { goodGlueRegistration  } from "./good";
<% for(var i=0; i < files.length; i++) { -%>
import <%= files[i].variable %> from "./<%= files[i].filename %>";
<% } -%>

const plugins = [
    goodGlueRegistration,
<% for(var i=0; i < files.length; i++) { -%>
    ...<%= files[i].variable %>,
<% } -%>
];

export default plugins;
