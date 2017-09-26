import { PluginRegistrationObject } from "hapi";
import { goodGlueRegistration  } from "./good";
<% for(var i=0; i < files.length; i++) { -%>
import <%= files[i].importvariable %> from "./<%= files[i].importname %>";
<% } -%>

const plugins = [
    goodGlueRegistration,
<% for(var i=0; i < files.length; i++) { -%>
    ...<%= files[i].importvariable %>,
<% } -%>
];

export default plugins;
