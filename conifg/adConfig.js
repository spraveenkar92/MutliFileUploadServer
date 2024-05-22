const logger = require("../logger");
logger.info(`From adConfig : ${process.env.URL_PRODUCTION_MB}`);

const config_AD_MY = {
  url: process.env.URL_PRODUCTION_MB,
  baseDN: process.env.BASEDN_MY,
  username: process.env.AD_MY_USERNAME,
  password: process.env.AD_MY_PASSWORD,
  timeout: process.env.TIMEOUT,
  referrals: {
    enabled: true,
    excluded: [],
  },
};

const config_AD_GM = {
  url: process.env.URL_PRODUCTION_GM,
  baseDN: process.env.BASEDN_GM,
  username: process.env.AD_GM_USERNAME,
  password: process.env.AD_GM_PASSWORD,
  timeout: process.env.TIMEOUT,
  referrals: {
    enabled: true,
    excluded: [],
  },
};

const config_AD_EQ = {
  url: process.env.URL_PRODUCTION_EQ,
  baseDN: process.env.BASEDN_EQ,
  username: process.env.AD_EQ_USERNAME,
  password: process.env.AD_EQ_PASSWORD,
  timeout: process.env.TIMEOUT,
  referrals: {
    enabled: true,
    excluded: [],
  },
};

const config_AD_GLOBAL = {
  url: process.env.URS_PRODUCTION_GLOBAL,
  baseDN: process.env.BASEDN_GLOBAL,
  username: process.env.AD_GLO_USERNAME,
  password: process.env.AD_GLO_PASSWORD,
  timeout: process.env.TIMEOUT,
  referrals: {
    enabled: true,
    excluded: [],
  },
};

// NOT USED
const config_AD_MB = {
  url: process.env.URL_PRODUCTION_MB,
  baseDN: process.env.BASEDN_MB,
  username: process.env.AD_MY_USERNAME,
  password: process.env.AD_MY_PASSWORD,
  timeout: process.env.TIMEOUT,
  referrals: {
    enabled: true,
    excluded: [],
  },
};

const config_AD_MB_USERS = {
  url: process.env.URL_PRODUCTION_MB,
  baseDN: process.env.BASEDN_MB_USERS,
  username: process.env.AD_MY_USERNAME,
  password: process.env.AD_MY_PASSWORD,
  timeout: process.env.TIMEOUT,
  referrals: {
    enabled: true,
    excluded: [],
  },
};

const config_AD_RBS_USERS = {
  url: process.env.URL_PRODUCTION_MB,
  baseDN: process.env.BASEDN_RBS_USERS,
  username: process.env.AD_MY_USERNAME,
  password: process.env.AD_MY_PASSWORD,
  timeout: process.env.TIMEOUT,
  referrals: {
    enabled: true,
    excluded: [],
  },
};

module.exports = {
  config_AD_MY,
  config_AD_MB,
  config_AD_MB_USERS,
  config_AD_RBS_USERS,
  config_AD_GM,
  config_AD_EQ,
  config_AD_GLOBAL,
};
