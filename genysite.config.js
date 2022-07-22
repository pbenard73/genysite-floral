const fs = require('fs')

module.exports = {
  homepage: "https://pbenard73.github.io/genysite-floral/",
  react:true,
  index:'index',
  App: `${__dirname}/src/template/App.js`,
  index_html: `${__dirname}/src/template/index.html`,
  data: {
    home_menu: [
      ['Css Styles & Components', '/css'],
      ['Configuration Variables', '/configuration']
    ],
    title: 'Genysite Floral Theme',
    menu: [
      ['Home', '/'],
      ['Css Styles & Components', '/css'],
      ['Configuration & Variables', '/configuration']
    ],
    metadata: [
      '<meta tamere="snif" />',
      () =>  '<meta tonpere="leplombier" />'
    ],
    copyright: '@2022 Genysite Theme'
  },
  postScript: function(compile) {
    this.data.footer = compile(`${__dirname}/src/footer.njk`)

    return this;
  }
}
