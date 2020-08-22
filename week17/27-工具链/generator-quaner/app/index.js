var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  // async prompting() {
  //   this.dependency = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Would you like to what dependency?",
  //     }
  //   ])
  // }

  writing() {
    // const pkgJson = {
    //   dependencies: {
    //     [this.dependency.name]: '*'
    //   }
    // };

    // Extend or create package.json file in destination path
    // this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    )
  }

  // install() {
  //   this.npmInstall();
  // }
};
