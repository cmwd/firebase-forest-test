const { collection } = require("forest-express-sequelize");

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection("user", {
  fields: [
    { field: "id", type: "String" },
    { field: "email", type: "String" },
    { field: "display_name", type: "String" },
    { field: "email_verified", type: "Boolean" },
    { field: "creation_time", type: "Date" },
    { field: "last_sign_in_time", type: "Date" },
  ],
});
