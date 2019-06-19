"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  initializing() {
    this.argument("storeName", { type: String, required: true });
  }

  prompting() {}

  writing() {
    this.fs.copyTpl(
      this.templatePath("example-store.vue.EJS"),
      this.destinationPath("src/store/" + this.options.storeName + ".js"),
      { storeName: this.options.storeName }
    );
  }

  install() {}
};
