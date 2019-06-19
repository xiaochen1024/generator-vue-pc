"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  initializing() {
    this.argument("pageName", { type: String, required: true });
  }

  prompting() {}

  writing() {
    this.fs.copyTpl(
      this.templatePath("example-page.vue.EJS"),
      this.destinationPath("src/pages/" + this.options.pageName + ".vue"),
      { pageName: this.options.pageName }
    );
  }

  install() {}
};
