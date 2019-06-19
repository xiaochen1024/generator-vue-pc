"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const process = require('child_process');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`创建 ${chalk.red("generator-vue-pc")} !`));

    const prompts = [
      {
        type: "text",
        name: "appName",
        message: "项目名称",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = { ...props, BASE_URL: "" };
    });
  }

  writing() {
    let target = [
      // 需要加工的文件使用数组
      ["package.json", "package.json"],
      ["public/index.html", "public/index.html"], // 不需要加工的文件
      "public/favicon.ico",
      "src/",
      "babel.config.js",
      "README.md",
      "staticServer.js",
      "vue.config.js"
    ]; // 添加隐藏文件 .文件名称在linux下会有问题，所以.xxx在template里改为_xxx
    target = target.concat([
      [".env.analyz", ".env.analyz"],
      [".env.local", ".env.local"],
      [".env.production", ".env.production"],
      [".npmignore", ".gitignore"],
      ["yarn.lock", "yarn.lock"]
    ]);
    target.forEach(file => {
      let toFile;
      let fromFile;
      if (Array.isArray(file)) {
        // eslint-disable-next-line
        fromFile = file[0]; // eslint-disable-next-line
        toFile = file[1];
        this.fs.copyTpl(
          this.templatePath(fromFile),
          this.destinationPath(toFile),
          this.props
        );
      } else {
        fromFile = file;
        toFile = file;
        this.fs.copy(
          this.templatePath(fromFile),
          this.destinationPath(toFile),
          this.props
        );
      }
    });
  }

  install() {
    this.yarnInstall();
  }
};
