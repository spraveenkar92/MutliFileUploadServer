const ActiveDirectory = require("activedirectory2");
const jwt = require("jsonwebtoken");

const logger = require("./logger");
const adConfig = require("./conifg/adConfig");

async function checkAdLogin(pfNo, password) {
  // const userDetails = { username: pfNo };
  // const token = generateToken(userDetails);
  // logger.info(`Authentication successful for ${pfNo}`);
  // return { token };

  const configs = [
    { domain: "MAYBANK-MY", config: adConfig.config_AD_MY },
    { domain: "MAYBANK-GM", config: adConfig.config_AD_GM },
    { domain: "etiqa-my", config: adConfig.config_AD_EQ },
    { domain: "global", config: adConfig.config_AD_GLOBAL },
  ];

  // logger.info(`URL_PRODUCTION_MB : ${process.env.URL_PRODUCTION_MB}`);
  // logger.info(`adConfig.config_AD_MY.url : ${adConfig.config_AD_MY.url}`);
  // logger.info("config object", JSON.stringify(configs[0].config));
  // logger.info(`configs[0].config.url : ${configs[0].config.url}`);

  for (const { domain, config } of configs) {
    // logger.info(`domain : ${domain}`);
    // // logger.info("Config", JSON.stringify(adConfig.config_AD_MY));
    // // logger.info("url", adConfig.config_AD_MY.url);
    // // logger.info("config", JSON.stringify(config));
    // logger.info("config object", JSON.stringify(config, null, 2));
    // logger.info("config", config.url);

    const ad = new ActiveDirectory(config);
    const username = `${domain}\\${pfNo}`;

    try {
      const auth = await authenticate(ad, username, password);
      if (auth) {
        const userDetails = { username: pfNo };
        const token = generateToken(userDetails);
        logger.info(`Authentication successful for ${pfNo}`);
        return { token };
      }
    } catch (error) {
      logger.error(
        `User authentication failed with ${domain}: ${JSON.stringify(error)}`
      );
      // throw new Error(error);
    }
  }

  return false;
}

function authenticate(ad, username, password) {
  return new Promise((resolve, reject) => {
    ad.authenticate(username, password, (err, auth) => {
      if (err) return reject(err);
      resolve(auth);
    });
  });
}

function generateToken(userDetails) {
  return jwt.sign(userDetails, process.env.SECRET_KEY, { expiresIn: "1h" });
}

module.exports = { checkAdLogin };

// function checkAdLogin(req, res) {
//   const pfNO = req.body.pfNo;
//   let username = "MAYBANK-MY\\" + pfNO;
//   const password = req.body.pwd;

//   let ad = new ActiveDirectory(config_AD_MY);
//   ad.authenticate(username, password, (err, auth) => {
//     if (err) {
//       logger.error(
//         "User authentication failed with MAYBANK-MY :",
//         JSON.stringify(err)
//       );

//       ad = new ActiveDirectory(config_AD_GM);
//       username = "MAYBANK-GM\\" + pfNO;
//       ad.authenticate(username, password, (err, auth) => {
//         if (err) {
//           logger.error(
//             "User authentication failed with MAYBANK-GM :",
//             JSON.stringify(err)
//           );

//           ad = new ActiveDirectory(config_AD_EQ);
//           username = "MAYBANK-EQ\\" + pfNO;
//           ad.authenticate(username, password, (err, auth) => {
//             if (err) {
//               logger.error(
//                 "User authentication failed with MAYBANK-EQ :",
//                 JSON.stringify(err)
//               );

//               ad = new ActiveDirectory(config_AD_GLOBAL);
//               username = "global\\" + pfNO;
//               ad.authenticate(username, password, (err, auth) => {
//                 if (err) {
//                   logger.error(
//                     "User authentication failed with global :",
//                     JSON.stringify(err)
//                   );
//                   return false;
//                 }
//                 if (auth) return true;
//               });
//             }
//             if (auth) return true;
//           });
//         }
//         if (auth) return true;
//       });
//     }
//     if (auth) return true;
//   });
// }
