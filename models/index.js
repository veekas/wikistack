const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const urlTitleGenerator = title => (
  title
    ? title.replace(/\s+/g, '_').replace(/\W/g, '')
    : Math.random().toString(36).substring(2, 14)
);

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    isUrl: true,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    isDate: true,
    defaultValue: Sequelize.NOW
  }
}, {
    getterMethods: {
      route(title) {
        return `/wiki/${this.getDataValue(title)}`;
      }
    },
    hooks: {
      beforeValidate: (page, options) => {
        console.log(page);
        console.log(page.urlTitle);
        console.log(page.title);
        page.urlTitle = urlTitleGenerator(page.urlTitle);
      }
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
});

module.exports = {
  db,
  Page,
  User
};
