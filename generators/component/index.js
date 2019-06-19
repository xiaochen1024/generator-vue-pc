"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  initializing() {
    this.argument("componentName", { type: String, required: true });
  }

  prompting() {}

  writing() {
    this.fs.copyTpl(
      this.templatePath("example-component.vue.EJS"),
      this.destinationPath(
        "src/components/" + this.options.componentName + ".vue"
      ),
      { componentName: this.options.componentName }
    );
  }

  install() {}
};
