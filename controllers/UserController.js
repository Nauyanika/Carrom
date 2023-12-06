const bcrypt = require("bcrypt");
//const check = require('../validation/CheckValidation')
const conn = require("../config/db");
const moment = require("moment");
const { authToken } = require("../middleware/getToken");
// User login
var nodemailer = require("nodemailer");

//list of getPlayerDAta
const getPlayerData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  users`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getPlayerIdData = async (req, res) => {
  var playerid = "";
  const sql2 = `SELECT COUNT(*) as totalcount  FROM users`;
  const allusers = await conn.query(sql2);
  console.log("allusers:", allusers[0].totalcount);
  if (allusers[0].totalcount >= 0 && allusers[0].totalcount <= 9) {
    // playerid="RL0000"+(allusers[0].totalcount)
    playerid = "BW0000" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 1 &&
    allusers[0].totalcount / 10 <= 9
  ) {
    playerid = "BW000" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 10 &&
    allusers[0].totalcount / 10 <= 99
  ) {
    playerid = "BW00" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 100 &&
    allusers[0].totalcount / 10 <= 999
  ) {
    playerid = "BW0" + allusers[0].totalcount;
  } else if (
    allusers[0].totalcount / 10 >= 1000 &&
    allusers[0].totalcount / 10 <= 9999
  ) {
    playerid = "BW" + allusers[0].totalcount;
  }
  console.log("playerId", playerid);
  statusCode = 200;
  message = "success";
  data = playerid;

  const responseData = {
    status: statusCode,
    message,
    data,
  };
  res.send(responseData);
};

const getPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT user.id,user.user_id,user.username,game_name.game_name FROM  user left join round_report on user.user_id=round_report.player_id left join game_name on round_report.game=game_name.id`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const LuckyDicegetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_luckydice ORDER BY created DESC  `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const WheelOfFortunegetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_wheeloffortune ORDER BY created DESC  `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PokergetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_pokerking ORDER BY created DESC`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const TigerVsElephantgetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_dragon ORDER BY created DESC `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
const LuckyBallgetPlayerHistoryData = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM game_record_lucky ORDER BY created DESC`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const Transaction = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM transactions ORDER BY txn_date DESC`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointTransfer = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointtransferred `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

//Playerpointhistory
const getPlayerPointHistory = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT user.id,user.user_id,user.username,game_record_dragon.game_id,game_record_dragon.created_at FROM user left join game_record_dragon on user.user_id=game_record_dragon.user_id`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agenot found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointReceive = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointtransferred `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointCancel = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointcanel `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const PointRejected = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM pointreject `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const GameReport = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM join_game `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const DailyStatus = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM daily_status`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const sendPoints = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  try {
    console.log(req.body, "Send data");
    const { distributor_id, points, } =
      req.body;
    sql = `SELECT * FROM users WHERE LOWER(user_id)= ? limit ?`;
    responseData = await conn.query(sql, [distributor_id, 1]);
    if (responseData.length > 0) {
      sql = `SELECT * FROM users WHERE LOWER(user_id)= ? limit ?`;
      responseData = await conn.query(sql, [distributor_id, 1]);
      if (responseData.length > 0) {
        const tpoints = parseInt(points) + parseInt(responseData[0].point);
        sql = "UPDATE users SET point= ? WHERE user_id=?";
        const userss = await conn.query(sql, [tpoints, distributor_id]);
        if (userss) {
          let formData = {
            user_id: distributor_id,
            point: points,
          };
                       /*  sql = "INSERT INTO point_history SET ?";
              const userss = await conn.query(sql, formData);
          */ statusCode = 200;
          message = "Points updated";
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
      /*           else {
            let formData = {
              stokez_id: stokez_id,
              point: points,
            };
            sql = "INSERT INTO  stokez_point SET ?";
            const userss = await conn.query(sql, formData);
            if (userss) {
              statusCode = 200;
              message = "Points updated";
            } else {
              statusCode = 500;
              message = "Something went wrong! database error";
            }
          }
  */
    } else {
      message = "Invalid stokez id";
      statusCode = 404;
    }

    const responseData1 = {
      status: statusCode,
      message,
    };
    res.send(responseData1);
  } catch (error) {
    console.log(error);
    res.status(500).send("Database error");
  }
};

//transfer player point
const sendPointstoPlayer = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { id, points } = req.body;

    let formData = {
      id: id,
      point: points,
    };
    let formData1 = {
      to: id,
      from: "Company",
      point: points,
    };

    if (points) {
      sql = `SELECT * FROM users WHERE email = ? limit ?`;
      responseData = await conn.query(sql, [id, 1]);
      if (responseData.length > 0) {
        console.log(responseData, "responseData");
        statusCode = 404;
        let stokezPointId = responseData[0].id;
        const tpoints = parseInt(points) + parseInt(responseData[0].point);

        sql = "UPDATE users SET ? WHERE email=?";
        updateResponse = await conn.query(sql, [{ point: tpoints }, id]);
        if (updateResponse) {
          //statusCode = 200
          // message    = "Points updated"
          sql = "INSERT INTO  point_history SET ?";
          const userss = await conn.query(sql, formData1);
          if (userss) {
            statusCode = 200;
            message = "Points updated";
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
    } else {
      statusCode = 404;
      message = "Points required";
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};
/* //GamesHistory------------------
const getDoubleChanceHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    let data;
    try { 
           // let sql = `SELECT * FROM round_report WHERE game=1 and outer_win=NULL and inner_win=NULL `;
           let sql = `SELECT * FROM round_report WHERE game=1 `;

            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "NOT found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getJeetoJokerHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=2 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const get16CardsHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=3`;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}
const getSpinGameHistory= async (req, res) => {
    let message = null
    let statusCode = 400  
    try { 
            let sql = `SELECT * FROM round_report WHERE game=4 `;
            const agent = await conn.query(sql)
            if(agent.length>0){ 
                statusCode = 200
                message    = "success" 
                data = agent
            }else{
                statusCode = 404
                message    = "Agent found"
            } 
            const responseData = {
                status: statusCode,
                message, 
                data
            }
            res.send(responseData)
     
    } catch (error) {
        res.status(500).send('Database error 1')
    }
}

 */

const withdrawRequest = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    let sql = "INSERT INTO withdraw_requests SET ?";
    let formData1 = {
      email: req.body.email,
      amount: req.body.amount,
      //payment_methode_id: req.body.paymentid,
    };

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = "withdraw updated";
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }
    //res.send("imageload sucessfully");
    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getwithdrawRequest = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  withdraw_requests`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const
  UPI = async (req, res) => {
    let message = null;
    let statusCode = 400;
    let sql = "";
    let responseData;
    let updateResponse;
    try {
      let sql = "INSERT INTO upi SET ?";
      let formData1 = {
        actual_name: req.body.actual_name,
        upi_address: req.body.upi_address,
        emailId: req.body.emailId,
        // payment_methode_id: req.body.paymentid,
      };

      const userss = await conn.query(sql, formData1);
      let statusCode = 200;
      let message = "";
      if (userss) {
        statusCode = 200;
        message = "UPI updated";
      } else {
        statusCode = 500;
        message = "Something went wrong! database error";
      }
      //res.send("imageload sucessfully");
      const responseDatajson = {
        status: statusCode,
        message,
      };
      res.send(responseDatajson);
    } catch (error) {
      res.status(500).send("Database error");
    }
  };

const getUPI = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  upi`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const DailyBonus = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { playerid, bonus_day } = req.body;
    let sql = "INSERT INTO bonus SET ?";
    let formData1 = {
      playerid: req.body.playerid,
      bonus_day: req.body.bonus_day,
      // balance: req.body.balance,
      // payment_methode_id: req.body.paymentid,
    };
    // const bonusRows = JSON.parse(JSON.stringify(user))[0];

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = "Daily Bonus updated";
      //  console.log("data", data);
      if (userss) {
        sql = `SELECT * FROM users WHERE useremail= ? limit ?`;
        responseData = await conn.query(sql, [playerid, 1]);
        if (responseData.length > 0) {
          const bonusadded = 1 + parseInt(responseData[0].point);
          sql = "UPDATE users SET point= ? WHERE useremail=?";

          const userss = await conn.query(sql, [bonusadded, playerid]);
          console.log(userss);


          //balance:balance;
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
        //res.send("imageload sucessfully");
        const responseDatajson = {
          status: statusCode,
          message,
        };
        res.send(responseDatajson);
      }
    } else { }
  }
  catch (error) {
    console.log(error)
    res.status(500).send("Database error");
  }
};

const Bank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  let isBankDetailsValid = false;
  try {
    const { userid, account_holder_name, ifsc_code, account_number } = req.body;
    let formData1 = {
      userid: req.body.userid,
      account_holder_name: req.body.account_holder_name,
      ifsc_code: req.body.ifsc_code,
      account_number: req.body.account_number,

    }

    sql = `SELECT * FROM bank WHERE userid = ? `;
    responseData = await conn.query(sql, userid);
    if (responseData.length > 0) {
      //sql = "UPDATE bank SET account_holder_name='',ifsc_code='',account_number='' where userid =? ";
      sql = "UPDATE bank SET ? where userid =? ";

      const userss = await conn.query(sql, [{ account_holder_name: account_holder_name, ifsc_code: ifsc_code, account_number: account_number }, userid]);
      statusCode = 201;
      message = "Data is updated successfully ";
      isBankDetailsValid = true
      console.log(userss);;
    }
    else {
      sql = "INSERT INTO  bank SET ?";
      const users = await conn.query(sql, formData1);
      if (users) {

        statusCode = 200;
        message = "detail updated";
        isBankDetailsValid = true
      }
    }

    const responseDatajson = {
      status: statusCode,
      message,
      isBankDetailsValid
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};

const fetchUPIBank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { emailId } = req.body;
  try {
    let sql = `SELECT * FROM  bank ,upi where  bank.emailId=upi.emailId`;
    const agent = await conn.query(sql, emailId);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";

      var data1 = {};
      // data1.status = 200;
      // data1.message = "success";
      var UPI = {};
      UPI.id = agent[0].id;
      UPI.actual_name = agent[0].actual_name;
      UPI.upi_address = agent[0].upi_address;
      data1.UPI = UPI;
      var account = {};

      account.ifsc_code = agent[0].ifsc_code;
      account.account_number = agent[0].account_number;
      account.actual_name = agent[0].actual_name;
      data1.account = account;
      data = data1;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getBank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  try {
    let sql = `SELECT * FROM  bank`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      data = agent;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const getfetchBank = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  let isCardAdded = false
  const { userid } = req.body;
  try {
    let sql = `SELECT * FROM  bank where userid=?`;
    const agent = await conn.query(sql, userid);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      isCardAdded = true;
      var data1 = {};
      // data1.status = 200;
      // data1.message = "success";
      /*  var UPI = {};
      UPI.id = agent[0].id;
      UPI.actual_name = agent[0].actual_name;
      UPI.upi_address = agent[0].upi_address;
      data1.UPI = UPI;
      */ var account = {};
      account.userid = agent[0].userid;
      account.ifsc_code = agent[0].ifsc_code;
      account.account_number = agent[0].account_number;
      account.account_holder_name = agent[0].account_holder_name;
      data1.account = account;
      data = data1;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      isCardAdded,
      data,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};

const referCode = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { useremail, refer_code } = req.body;
  try {
    /* let sql = `SELECT * FROM  users where useremail=?`;
    const agent = await conn.query(sql, useremail);
     */ if (refer_code != undefined) {
      sql = `SELECT * FROM users WHERE refer_code= ? limit ?`;
      var responseData = await conn.query(sql, [refer_code, 1]);
      if (responseData.length > 0) {
        sql = `SELECT * FROM users WHERE refer_code= ? limit ?`;
        responseData = await conn.query(sql, [refer_code, 1]);
        if (responseData.length > 0) {
          const bonusadded = 1 + parseInt(responseData[0].point);
          sql = "UPDATE users SET point= ? WHERE refer_code=?";

          const userss = await conn.query(sql, [bonusadded, refer_code]);
          console.log(userss);

          sql = `SELECT * FROM users WHERE useremail= ? limit ?`;
          responseData = await conn.query(sql, [useremail, 1]);
          if (responseData.length > 0) {
            const bonusadded = 1 + parseInt(responseData[0].point);
            sql = "UPDATE users SET point= ? WHERE useremail=?";

            const userss = await conn.query(sql, [bonusadded, useremail]);
            console.log(userss);
            statusCode = 200;
            message = " refer code successfully applied";

            data = { Balance: bonusadded };
          }

        } else {
        }
      }
    }

    const responseData1 = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData1);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Database error");
  }
};




const withdrawRequestHistory = async (req, res) => {
  let message = null;
  let status = 400;
  var data = {};

  try {

    /** check user exist or not */
    const sql1 = `SELECT * from transactions LEFT JOIN lusers ON transactions.user_id = lusers.user_id 
      LEFT JOIN bank_details ON transactions.user_id = bank_details.user_id WHERE  transactions.is_type = 7 OR transactions.is_type = 6 OR transactions.is_type = 11 ORDER BY transaction_id DESC`;
    const results = await conn.query(sql1);
    if (results.length > 0) {
      const responses = (JSON.parse(JSON.stringify(results)));
      message = 'Success'
      status = 200
      data = responses
    }
    else {
      status = 404
      message = "No Withdraw history"
    }
    const responseData = {
      status,
      message,
      data: data,

    }
    res.send(responseData)
  } catch (errors) {
    console.log("error", errors)
    res.send({ err: errors })
  }
}






const VerifyAccountStatus = async (req, res) => {
  let message = null;
  let status = 400;
  var data = {};

  try {
    let { user_id, bank_detail_id } = req.body
    sql = `SELECT * FROM lusers  WHERE user_id = ? limit ?`;
    responseData = await conn.query(sql, [user_id, 1]);
    if (responseData.length > 0) {
      let phoneNumber = responseData[0].phone
      if (responseData[0].phone) {
        sql = `SELECT * FROM bank_details  WHERE bank_detail_id = ? limit ?`;
        responseData = await conn.query(sql, [bank_detail_id, 1]);
        if (responseData.length > 0) {
          var expression = /[0-9]{6}/;
          if (expression.test(responseData[0].account_number)) {
            let IFSCCODe = (responseData[0].ifsc_code).toUpperCase()
            if (ifsc.validate(IFSCCODe)) {
              const ifscd = await ifsc.fetchDetails(IFSCCODe)
              if (ifscd) {
                //CReate Benefieciary ID
                let account_holder_name = responseData[0].account_holder_name
                let userName = account_holder_name.replace(/\s/g, '')
                let userId = userName.substring(0, 6);//get first  chars
                let str = `${userId}${phoneNumber}`
                let beneId = str.toUpperCase()
                const formData = {
                  benefieciary_id: beneId,
                  ifsc_code: IFSCCODe,
                  account_number: responseData[0].account_number,
                  account_holder_name: responseData[0].account_holder_name,
                  branch: ifscd.BRANCH,
                  city: ifscd.CITY,
                  state: ifscd.STATE,
                  bank_name: ifscd.BANK,
                  is_verified: 1
                }
                sql = "UPDATE bank_details Set ?  WHERE bank_detail_id= ?"
                updateResponse = await conn.query(sql, [formData, bank_detail_id]);
                if (updateResponse) {
                  statusCode = 200
                  message = "Bank Verified"
                } else {
                  statusCode = 500
                  message = "Something went wrong!"
                }
              } else {
                statusCode = 500
                message = "Validation error"
              }

            } else {
              statusCode = 401
              message = "Invalid IFSC code!"
            }
          } else {
            statusCode = 401
            message = "Invalid A/C number!"
          }
        } else {
          statusCode = 404
          message = "Invalid Data"
        }
      } else {
        statusCode = 404
        message = "Players Phone number does not exist!"
      }
    } else {
      statusCode = 404
      message = "User not Exist!"
    }
    responseJson = {
      status: statusCode,
      message,
      data
    }
    res.send(responseJson)
  } catch (error) {
    console.log("error", error)
    responseJson = {
      status: statusCode,
      message: "Database Error!"
    }
    res.send(responseJson)
  }



}




const acceptPayouts = async (req, res) => {
  let message = null;
  let status = 400;
  var data = {};

  // try {
  console.log('request data', req.body)
  let transferId = moment().utcOffset(330).format('YYYYMMDDHHmmss')
  let { user_id, bank_detail_id, txn_id } = req.body
  sql = `SELECT * FROM bank_details INNER JOIN lusers ON lusers.user_id=bank_details.user_id WHERE bank_details.bank_detail_id=? AND bank_details.user_id = ? limit ?`;
  responseData = await conn.query(sql, [bank_detail_id, user_id, 1]);
  if (responseData.length > 0) {
    if (responseData[0].benefieciary_status == 1) {
      let benefieciaryId = responseData[0].benefieciary_id
      sql = `SELECT * FROM transactions WHERE transaction_id = ? limit ?`;
      responseData = await conn.query(sql, [txn_id, 1]);
      if (responseData.length > 0) {
        let Amount = Math.abs(responseData[0].txn_amount)
        let TxnId = responseData[0].txn_id
        var dataJson = `{\n "beneId": "${benefieciaryId}",\n  "amount": "${Amount}",\n  "transferId": "${transferId}"\n}`;

        let reqResponse = await generateToken();
        if (reqResponse.status == 200) {
          var config = {
            method: 'post',
            url: `${commanEnv.TEST}/payout/v1/requestTransfer`,
            headers: {
              'Authorization': `Bearer ${reqResponse.token}`
            },
            data: dataJson
          };
          axios(config).then(async function (response) {
            if (response.data.status == "SUCCESS") {
              let formDaTA = {
                is_type: 6
              }
              let sql1 = "UPDATE transactions Set ?  WHERE transaction_id = ?"
              let results = await conn.query(sql1, [formDaTA, txn_id]);
              // let  results = true; 
              if (results) {
                await sendMail(user_id, TxnId, Amount, 2);
                statusCode = 200
                message = "Accepted"
              } else {
                statusCode = 404
                message = "Something went wrong!"
              }
            } else {
              statusCode = 403
              message = "Unabled to transfered"
            }
          }).catch(function (error) {
            statusCode = 500
            message = "Something went wrong!"
          });
        } else {
          statusCode = 403
          message = "IP not whitelisted"
        }
      } else {
        statusCode = 404
        message = "Invalid transaction details"
      }
    } else {

    }
  } else {
    statusCode = 404
    message = "Invalid Details!"
  }
  responseJson = {
    status: statusCode,
    message: message
  }
  res.send(responseJson)
  // } catch (error) {
  //     responseJson = {
  //         status:500,
  //         message:"Database Error!"
  //     }
  //     res.send(responseJson)
  // }


}







// const AddCashAmountList = async (req, res) => {
//   let message = null;
//   let statusCode = 400;
//   let data;
//   var arr = []
//   let cashAmountListSend = false;
//   try {
//     let sql = `SELECT * FROM  minmax`;
//     const agent = await conn.query(sql);
//     if (agent.length > 0) {
//       statusCode = 200;
//       arr.push(agent[0].minimum)
//       // arr.push(10)
//       arr.push(20)
//       arr.push(40)
//       arr.push(50)
//       arr.push(100)
//       arr.push(agent[0].maximum)

//       message = "success";
//       data = {
//         amountList: arr,
//         minimumlist: agent[0].minimum,
//         maximumlist: agent[0].maximum,
//       }
//       cashAmountListSend = true

//     } else {
//       statusCode = 404;
//       message = "detail not found";
//     }
//     const responseData = {
//       status: statusCode,
//       message,
//       data,
//       cashAmountListSend,

//     };
//     res.send(responseData);
//   } catch (error) {
//     res.status(500).send("Database error");
//   }
// };




const carromTournment = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let data;
  let tournmentListSend = false;
  try {
    let sql = `SELECT * FROM carrom_tournment LIMIT 100`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "data sent successfully";
      data = {
        id: agent[0].id,
        tournment_name: agent[0].tournment_name,
        reward: agent[0].reward,
        entry_fee: agent[0].entry_fee,

      };
      tournmentListSend = true;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
      tournmentListSend,
    };
    res.send(responseData);
  } catch (error) {
    console.log(error)
    res.status(500).send("Database error");
  }
}








const carromTournments = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let data;
  try {
    let sql = "INSERT INTO carrom_tournment SET ?";
    let formData1 = {
      tournment_name: req.body.tournment_name,
      entry_fee: req.body.entry_fee,
      Player_no: req.body.Player_no,
      reward: req.body.reward,
      total_player: req.body.total_player,
      winner_no: req.body.winner_no,
    };

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = "data updated";
      data = userss;
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }
    const responseDatajson = {
      status: statusCode,
      message,
      data: data.userss,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error-------------", error)
    res.status(500).send("Database error");
  }
}

const sendWinningName = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { userid, username, currentDate } = req.body;
    let formData1 = {
      userid: userid,
      username: username,
      date: currentDate,
    }

    sql = `SELECT * FROM winner_name WHERE userid = ? `;
    responseData = await conn.query(sql, userid);
    if (responseData.length > 0) {
      sql = "UPDATE winner_name SET date =? WHERE userid =? ";

      const userss = await conn.query(sql, [currentDate, userid]);
      statusCode = 201;
      message = "update data ";

      console.log(userss);;
    }
    else {
      sql = "INSERT INTO  winner_name SET ?";
      const users = await conn.query(sql, formData1);
      if (users) {

        statusCode = 200;
        message = "Winner added in Winner List";
      }
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};




const Tournments = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let data;
  try {
    let sql = "INSERT INTO tournment SET ?";
    let formData1 = {
      tournment_id: req.body.tournment_id,
      tournment_name: req.body.tournment_name,
      entryfee: req.body.entryfee,
      reward: req.body.reward,
    };

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = " Tournment data updated";
      data = userss;
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }
    const responseDatajson = {
      status: statusCode,
      message,

    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error-------------", error)
    res.status(500).send("Database error");
  }
}


// const Tournmentlist = async (req, res) => {
//   let message = null;
//   let statusCode = 400;
//   let data = {};
//   let tournmentListSend = false;
//   try {
//     let sql = `SELECT * FROM tournment `;
//     const agent = await conn.query(sql);
//     if (agent.length > 0) {
//       statusCode = 200;
//       message = "data sent successfully";
//       var tournmentdata = []
//       var tournmentDetail
//       for (var i = 0; i < agent.length; i++) {
//         tournmentDetail = {}
//         tournmentDetail.tournment_id = agent[i].tournment_id,
//           tournmentDetail.tournment_name = agent[i].tournment_name,
//           tournmentDetail.reward = agent[i].reward,
//           tournmentDetail.entryfee = agent[i].entryfee,
//           tournmentdata.push(tournmentDetail)
//         tournmentDetail = {}
//       }
//       tournmentListSend = true;
//     } else {
//       statusCode = 404;
//       message = "Agent not found";
//     }
//     const responseData = {
//       status: statusCode,
//       message,
//       tournmentdata,
//       tournmentListSend,
//     };
//     res.send(responseData);
//   } catch (error) {
//     console.log(error)
//     res.status(500).send("Database error");
//   }
// }


const t = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let tournmentListSend = false;

  try {
    let sql = `SELECT * FROM tournment `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      tournmentListSend = true
      data = agent;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
      tournmentListSend,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};


const HistoryDetail = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let data;
  try {
    let sql = "INSERT INTO history_detail SET ?";
    let formData1 = {
      userid: req.body.userid,
      gamemode: req.body.gameMode,
      date: req.body.dateAndTime,
      win_lose: req.body.winOrLose,
    };

    const userss = await conn.query(sql, formData1);
    let statusCode = 200;
    let message = "";
    if (userss) {
      statusCode = 200;
      message = " History Added to the history List";
      data = userss;
    } else {
      statusCode = 500;
      message = "Something went wrong! database error";
    }
    const responseDatajson = {
      status: statusCode,
      message,

    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error-------------", error)
    res.status(500).send("Database error");
  }
}









const Historylist = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  let isDetailAdded = false
  const { userid } = req.body;
  try {
    let sql = `SELECT * FROM  history_detail where userid=?`;
    const agent = await conn.query(sql, userid);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      isDetailAdded = true;
      var data1 = [];
      for (var i = 0; i < agent.length; i++) {
        var HistoryDetail = {}
        HistoryDetail.gameMode = agent[i].gamemode,
          HistoryDetail.dateAndTime = agent[i].date,
          HistoryDetail.winOrLose = agent[i].win_lose,
          data1.push(HistoryDetail)
        // HistoryDetail={}

      }
      data = data1;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      isDetailAdded,
      data,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};




const shopStrikersList = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let data
  try {
    let sql = `SELECT * FROM  shop_strikers_list`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      var datalist = []
      var tournmentDetail
      for (var i = 0; i < agent.length; i++) {
        tournmentDetail = {}
        tournmentDetail.strikerid = agent[i].strikerid,
          tournmentDetail.name = agent[i].name,
          tournmentDetail.price = agent[i].price,
          datalist.push(tournmentDetail)
        tournmentDetail = {}
      }

    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      datalist,
    };
    res.send(responseData);
  } catch (error) {
    res.status(500).send("Database error");
  }
};



// const SendPurchaseStrikerIndex = async (req, res) => {
//   try {
//     const formData = {
//       userid: req.body.userid,
//       striker_index: req.body.purchasedStrikerIndex,
//     };

//     const sql = "INSERT INTO purchasestriker SET ?";
//     const result = await conn.query(sql, formData);

//     let statusCode;
//     let message;

//     if (result.affectedRows > 0) {
//       statusCode = 200;
//       message = "Added to the purchasedStrikerIndex List";
//     } else {
//       statusCode = 500;
//       message = "Something went wrong! database error";
//     }

//     const responseData = {
//       status: statusCode,
//       message,
//       data: result,
//     };

//     res.send(responseData);
//   } catch (error) {
//     console.log("error-------------", error);
//     res.status(500).send("Database error");
//   }
// };
const SendPurchaseStrikerIndex = async (req, res) => {
  try {
    const { userid, purchasedStrikerIndex, strikerprice } = req.body;

    const formData = {
      userid,
      striker_index: purchasedStrikerIndex,
      strikerPrice: strikerprice,
    };

    const getUserPointQuery = "SELECT point FROM users WHERE user_id = ?";
    const userPointResult = await conn.query(getUserPointQuery, userid);

    const userPoint = userPointResult[0].point;

    let statusCode;
    let message;
    let result;

    if (userPoint >= strikerprice) {
      const updatedPoint = userPoint - strikerprice;

      const updatePointQuery = "UPDATE users SET point = ? WHERE user_id = ?";
      await conn.query(updatePointQuery, [updatedPoint, userid]);

      const updateUserPointQuery = "UPDATE users SET point = point + ? WHERE role_id = 1";
      await conn.query(updateUserPointQuery, [strikerprice]);

      const insertStrikerQuery = "INSERT INTO purchasestriker SET ?";
      result = await conn.query(insertStrikerQuery, formData);

      if (result.affectedRows > 0) {
        statusCode = 200;
        message = "Purchase Success";
      } else {
        statusCode = 500;
        message = "Something went wrong! Database error";
      }
    } else {
      statusCode = 400;
      message = "Insufficient Balance";
    }

    const responseData = {
      status: statusCode,
      message,
    };

    res.send(responseData);
  } catch (error) {
    console.log("error-------------", error);
    res.status(500).send("Database error");
  }
};

const fetchPurchaseStrikerIndex = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  //let isCardAdded=false
  const { userid } = req.body;
  try {
    let sql = `SELECT * FROM  purchasestriker where userid=?`;
    const agent = await conn.query(sql, userid);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      var data1 = {}
      var purchasestriker = [];
      for (var i = 0; i < agent.length; i++) {

        //var StrikerIndex = {};
        //  StrikerIndex.purchasestriker = agent[i].striker_index;
        purchasestriker.push(agent[i].striker_index)

      }
      data1.purchasestriker = purchasestriker;
      data = data1;
      // data = purchasestriker;

    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
      //purchasestriker,   
    };
    res.send(responseData);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};

const equippedStrikerIndex = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { userid, equippedStrikerIndex } = req.body;
    let formData1 = {
      user_id: req.body.userid,
      equippedStrikerIndex: req.body.equippedStrikerIndex,

    }

    sql = `SELECT * FROM users WHERE user_id = ? `;
    responseData = await conn.query(sql, userid);
    if (responseData.length > 0) {
      //sql = "UPDATE bank SET account_holder_name='',ifsc_code='',account_number='' where userid =? ";
      sql = "UPDATE users SET ? where user_id =? ";

      const userss = await conn.query(sql, [{ equippedStrikerIndex: equippedStrikerIndex }, userid]);
      statusCode = 201;
      message = "Data is updated successfully ";

      console.log(userss);;
    }
    else {
      /*  sql = "INSERT INTO  users SET ?";
         const users = await conn.query(sql, formData1);
         if (users) {
*/
      statusCode = 400;
      message = "userid is invalid ";
      //    } 
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};



const fetchequippedStrikerIndex = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { userid } = req.body;
  try {
    let sql = `SELECT * FROM  users where user_id=?`;
    const agent = await conn.query(sql, userid);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      var data1 = {};
      var index = {};

      index.equippedStrikerIndex = agent[0].equippedStrikerIndex,
        data1.index = index;
      data = data1;
    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};
const fetchbalance = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  const { userid } = req.body;
  try {
    let sql = `SELECT * FROM  users where user_id=?`;
    const agent = await conn.query(sql, userid);
    if (agent.length > 0) {
      statusCode = 200;
      message = " balance fetch successfully";



    } else {
      statusCode = 404;
      message = "detail not found";
    }
    const responseData = {
      status: statusCode,
      message,
      balance: agent[0].point,

    };
    res.send(responseData);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};

const SubmitWithdrawRequest = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { userid, amount } = req.body;

    sql = `SELECT * FROM users WHERE user_id = ? limit ?`;

    //sql = `SELECT * FROM users WHERE useremail = ? limit ?`;

    responseData = await conn.query(sql, [userid, 1]);
    var userEmail = responseData[0].useremail
    let formData1 = {
      receiver: userEmail,
      sender: "Company",
      point: amount,
      transaction_type: "Withdraw Transaction"

    };
    if (parseInt(responseData[0].point) < parseInt(amount)) {
      statusCode = 404;
      message = "insufficent balance ,please add the balance"
    }

    else {
      if (amount) {
        sql = `SELECT * FROM users WHERE user_id = ? limit ?`;
        //sql = `SELECT * FROM users WHERE useremail = ? limit ?`;

        responseData = await conn.query(sql, [userid, 1]);
        if (responseData.length > 0) {
          console.log(responseData, "responseData");
          statusCode = 404;
          let stokezPointuserid = responseData[0].userid;

          const tamount = parseInt(responseData[0].point) - parseInt(amount);

          sql = "UPDATE users SET ? WHERE user_id=?";
          // sql = "UPDATE users SET ? WHERE useremail=?";

          // updateResponse = await conn.query(sql, [{ point: tamount }, userid]);
          updateResponse = await conn.query(sql, [{ point: tamount }, userid]);
          if (updateResponse) {
            // statusCode = 200
            // message    = "amount updated"

            sql = "INSERT INTO  point_history SET ?";
            const userss = await conn.query(sql, formData1);
            if (userss) {
              statusCode = 200;
              message = " withdraw amount updated";
            } else {
              statusCode = 500;
              message = "Something went wrong! database error";
            }
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        }
      } else {
        statusCode = 404;
        message = "amount required";
      }

    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};




const AddBalance = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { userid, addAmount } = req.body;

    let formData = {
      useremail: userid,
      point: addAmount,
    };
    sql = `SELECT * FROM users WHERE user_id = ? limit ?`;
    responseData = await conn.query(sql, [userid, 1]);
    var userEmail = responseData[0].useremail
    let formData1 = {
      receiver: userEmail,
      sender: "Company",
      point: addAmount,
      transaction_type: "Transaction"
    };

    if (addAmount) {
      sql = `SELECT * FROM users WHERE user_id = ? limit ?`;
      responseData = await conn.query(sql, [userid, 1]);
      if (responseData.length > 0) {
        console.log(responseData, "responseData");
        statusCode = 404;
        let stokezPointId = responseData[0].user_id;
        //const tpoints = parseInt(points) + (responseData[0].point);
        const taddAmount = parseInt(addAmount) + parseInt(responseData[0].point);

        sql = "UPDATE users SET ? WHERE user_id=?";
        // updateResponse = await conn.query(sql, [{ point: tpoints }, id]);
        updateResponse = await conn.query(sql, [{ point: taddAmount }, userid]);
        if (updateResponse) {
          // statusCode = 200
          // message    = "Points updated"

          // sql = "INSERT INTO  point_history SET ?";
          sql = "INSERT INTO  point_history SET ?";
          const userss = await conn.query(sql, formData1);
          if (userss) {
            statusCode = 200;
            message = "Points updated";
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        } else {
          statusCode = 500;
          message = "Something went wrong! database error";
        }
      }
    } else {
      statusCode = 404;
      message = "Points required";
    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};


const DeductBalance = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let sql = "";
  let responseData;
  let updateResponse;
  try {
    const { userid, deductamount } = req.body;

    sql = `SELECT * FROM users WHERE user_id = ? limit ?`;

    //sql = `SELECT * FROM users WHERE useremail = ? limit ?`;

    responseData = await conn.query(sql, [userid, 1]);
    var userEmail = responseData[0].useremail
    let formData1 = {
      receiver: userEmail,
      sender: "Company",
      point: deductamount,
      transaction_type: "deduct"

    };
    if (parseInt(responseData[0].point) < parseInt(deductamount)) {
      statusCode = 404;
      message = "insufficent balance ,please add the balance"
    }

    else {
      if (deductamount) {
        sql = `SELECT * FROM users WHERE user_id = ? limit ?`;
        //sql = `SELECT * FROM users WHERE useremail = ? limit ?`;

        responseData = await conn.query(sql, [userid, 1]);
        if (responseData.length > 0) {
          console.log(responseData, "responseData");
          statusCode = 404;
          let stokezPointuserid = responseData[0].userid;

          const tdeductamount = parseInt(responseData[0].point) - parseInt(deductamount);

          sql = "UPDATE users SET ? WHERE user_id=?";
          // sql = "UPDATE users SET ? WHERE useremail=?";

          // updateResponse = await conn.query(sql, [{ point: tdeductamount }, userid]);
          updateResponse = await conn.query(sql, [{ point: tdeductamount }, userid]);
          if (updateResponse) {
            // statusCode = 200
            // message    = "deductamount updated"

            sql = "INSERT INTO  point_history SET ?";
            const userss = await conn.query(sql, formData1);
            if (userss) {
              statusCode = 200;
              message = "Deduct  amount updated";
            } else {
              statusCode = 500;
              message = "Something went wrong! database error";
            }
          } else {
            statusCode = 500;
            message = "Something went wrong! database error";
          }
        }
      } else {
        statusCode = 404;
        message = "deduct amount required";
      }

    }

    const responseDatajson = {
      status: statusCode,
      message,
    };
    res.send(responseDatajson);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};

const WinnerListFetch = async (req, res) => {
  let message = null;
  let statusCode = 400;
  var data = {};
  try {
    let sql = `SELECT * FROM  winner_name`;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "success";
      var data1 = []
      for (var i = 0; i < agent.length; i++) {
        data1.push(agent[i].username)
      }
      data = data1

    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      data,
    };
    res.send(responseData);
  } catch (error) {
    console.log("error", error)
    res.status(500).send("Database error");
  }
};



async function verifyKyc(req, res) {
  console.log(req.body);
  const { userId } = req.body;

  try {
    const sql = `SELECT * FROM verify_kyc WHERE userId = ?`;
    const users = await conn.query(sql, userId);

    let statusCode, message, kycStatus;
    if (users.length > 0) {
      statusCode = 200;
      kycStatus = true;
      message = "KYC status fetched";
    } else {
      statusCode = 200;
      kycStatus = false;
      message = "KYC status not found";
    }

    const responseData = {
      status: statusCode,
      kycStatus: kycStatus,
      message: message,
    };

    res.json(responseData);
  } catch (error) {
    console.log("err", error);
    res.status(500).send("Database error");
  }
}




async function completeKyc(req, res) {
  console.log(req.body);

  try {
    const formData = {
      userId: req.body.userid,
      aadharNumber: req.body.aadhaarNumber,
      pan_number: req.body.pan_number,
      customer_number: req.body.customer_number,
      passport_number: req.body.passport_number,
      voterID_number: req.body.voterID_number,
      rationCard_number: req.body.rationCard_number
    };

    const sql = "INSERT INTO verify_kyc SET ?";
    const insertResult = await conn.query(sql, formData);

    let statusCode, message, kycStatus;
    if (insertResult) {
      statusCode = 200;
      kycStatus = true;
      message = "KYC verification successful";
    } else {
      statusCode = 500;
      kycStatus = false;
      message = "KYC verification failed";
    }

    const responseData = {
      status: statusCode,
      kycStatus: kycStatus,
      message: message,
    };

    res.json(responseData);
  } catch (error) {
    console.log("err", error);
    res.status(500).send("Database error");
  }
}

async function adminRevenue(req, res) {
  try {
    const { amount } = req.body;

    // Check if the user's role_id is 1
    const roleCheckSql = "SELECT role_id FROM users WHERE role_id = 1";
    const roleCheckResult = await conn.query(roleCheckSql);

    if (roleCheckResult.length > 0) {
      
      const addAmountSql = "UPDATE users SET point = point + ? WHERE role_id = 1";
      await conn.query(addAmountSql, [amount]);
      res.status(200).json({
        status: "success",
        message: "Amount added to the Admin Revenue",
      });
    } else {
      
      res.status(400).json({
        status: "error",
        message: "Invalid role_id. Only users with role_id 1 can add revenue.",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "error",
      message: "Database error",
    });
  }
}

async function setServiceCharge(req, res) {
  try {
    const { service_charge } = req.body;

    // Check if a user with role_id 1 exists
    const roleCheckSql = "SELECT role_id FROM users WHERE role_id = 1";
    const roleCheckResult = await conn.query(roleCheckSql);

    if (roleCheckResult.length > 0) {
      // Update the service_charge field for the user with role_id 1
      const updateServiceChargeSql = "UPDATE users SET service_charge = ? WHERE role_id = 1";
      await conn.query(updateServiceChargeSql, [service_charge]);

      res.status(200).json({
        status: 200,
        service_charge: service_charge,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Invalid role_id. Only users with role_id 1 can update the service charge.",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "error",
      message: "Database error",
    });
  }
}

async function fetchServiceCharge(req, res) {
  try {
    // Check if the user's role_id is 1
    const roleCheckSql = "SELECT role_id, service_charge FROM users WHERE role_id = 1";
    const roleCheckResult = await conn.query(roleCheckSql);

    if (roleCheckResult.length > 0) {
      const { service_charge } = roleCheckResult[0];
      
      res.status(200).json({
        status: 200,
        message: "Service charge fetched",
        service_charge: service_charge,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Invalid role_id. Only users with role_id 1 can fetch the service charge.",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "error",
      message: "Database error",
    });
  }
}

async function fetchAdminRevenue(req, res) {
  try {
    // Check if the user's role_id is 1
    const roleCheckSql = "SELECT role_id, point FROM users WHERE role_id = 1";
    const roleCheckResult = await conn.query(roleCheckSql);

    if (roleCheckResult.length > 0) {
      const { point } = roleCheckResult[0];
      
      res.status(200).json({
        status: 200,
        message: "Admin Revenue fetched",
        point: point,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Invalid role_id. Only users with role_id 1 can fetch the admin revenue.",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: "error",
      message: "Database error",
    });
  }
}






async function addStriker(req, res) {
  try {
    const { name, price } = req.body;
    const convertedPrice = price.toString(); 

    const getIdQuery = "SELECT MAX(id) AS maxId FROM shop_strikers_list";
    const result = await conn.query(getIdQuery);
    const maxId = result[0].maxId;
    const strikerId = maxId !== null ? maxId : 0;

    const insertQuery = "INSERT INTO shop_strikers_list (strikerid, name, price) VALUES (?, ?, ?)";
    await conn.query(insertQuery, [strikerId, name, convertedPrice]);

    res.status(200).json({ message: "Striker added successfully" });
  } catch (error) {
    console.log("Error adding striker:", error);
    res.status(500).json({ message: "Failed to add striker" });
  }
}

async function getStrikerList(req, res) {
  try {
    const selectQuery = "SELECT * FROM shop_strikers_list";
    const result = await conn.query(selectQuery);
    res.send(result);
  } catch (error) {
    console.log("Error retrieving striker list:", error);
    res.status(500).send("Failed to retrieve striker list");
  }
}

async function deleteStriker(req, res) {
  try {
    const strikerId = req.params.strikerId;
    const deleteQuery = 'DELETE FROM shop_strikers_list WHERE id = ?';
    await conn.query(deleteQuery, [strikerId]);

    res.status(200).json({ status: 200, message: 'Striker deleted successfully' });
  } catch (error) {
    console.log('Error deleting striker:', error);
    res.status(500).json({ status: 500, message: 'Failed to delete striker' });
  }
}

async function deleteTournament(req, res) {
  try {
    const tournamentId = req.body.id;
    const deleteQuery = 'DELETE FROM tournment WHERE tournment_id = ?';
    await conn.query(deleteQuery, [tournamentId]);

    res.status(200).json({ status: 200, message: 'Tournament deleted successfully' });
  } catch (error) {
    console.log('Error deleting tournament:', error);
    res.status(500).json({ status: 500, message: 'Failed to delete tournament' });
  }
}

const AddCashAmountList = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let data;
  let cashAmountListSend = false;

  try {
    const minMaxQuery = 'SELECT minimum, maximum, cash_amounts FROM minmax';
    const minMaxResult = await conn.query(minMaxQuery);

    if (minMaxResult.length > 0) {
      const minimum = minMaxResult[0].minimum;
      const maximum = minMaxResult[0].maximum;
      const cashAmounts = minMaxResult[0].cash_amounts.split(',');

      statusCode = 200;
      message = 'success';
      data = {
        minimumList: minimum,
        maximumList: maximum,
        cashAmountList: cashAmounts,
      };
      cashAmountListSend = true;
    } else {
      statusCode = 404;
      message = 'detail not found';
    }

    const responseData = {
      status: statusCode,
      message,
      data,
      cashAmountListSend,
    };

    res.send(responseData);
  } catch (error) {
    console.log('Error fetching cash amount list:', error);
    res.status(500).send('Database error');
  }
};

const submitMinMax = async (req, res) => {
  try {
    const { minimum, maximum, cashAmounts } = req.body;
    
    
    const updateQuery = 'UPDATE minmax SET minimum = ?, maximum = ?, cash_amounts = ?';
    await conn.query(updateQuery, [minimum, maximum, cashAmounts.join(',')]);
    
    res.status(200).json({ status: 200, message: 'Minmax values submitted successfully' });
  } catch (error) {
    console.log('Error submitting minmax values:', error);
    res.status(500).json({ status: 500, message: 'Failed to submit minmax values' });
  }
};

const getCurrentMinMax = async (req, res) => {
  try {
    const minMaxQuery = 'SELECT minimum, maximum, cash_amounts FROM minmax';
    const minMaxResult = await conn.query(minMaxQuery);

    if (minMaxResult.length > 0) {
      const minimum = minMaxResult[0].minimum;
      const maximum = minMaxResult[0].maximum;
      const cashAmounts = minMaxResult[0].cash_amounts;

      
      const cashAmountsArray = cashAmounts.split(',').map(amount => amount.trim());

      res.status(200).json({ minimum, maximum, cashAmounts: cashAmountsArray });
    } else {
      res.status(404).json({ message: 'Minmax values not found' });
    }
  } catch (error) {
    console.log('Error fetching current minmax values:', error);
    res.status(500).json({ message: 'Failed to fetch current minmax values' });
  }
};


const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { block } = req.body;
    
    
    const updateQuery = 'UPDATE users SET user_status = ? WHERE user_id = ?';
    await conn.query(updateQuery, [block ? 1 : 0, userId]);
    
    res.status(200).json({ status: 200, message: 'User status updated successfully' });
  } catch (error) {
    console.log('Error updating user status:', error);
    res.status(500).json({ status: 500, message: 'Failed to update user status' });
  }
};

const isUserBlocked = async (req, res) => {
  try {
    const { userid } = req.body;

    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE user_id = ?';
    const userResult = await conn.query(userQuery, [userid]);

    if (userResult.length === 0) {
      // User does not exist
      return res.status(404).json({ status: 404, message: 'User does not exist' });
    }

    // Check if the user is blocked
    const isBlocked = userResult[0].user_status === 1;
    if (isBlocked) {
      return res.status(200).json({ status: 200, message: 'User is blocked!', isUserBlocked: true });
    } else {
      return res.status(200).json({ status: 200, message: 'User is not blocked!', isUserBlocked: false });
    }
  } catch (error) {
    console.log('Error checking user block status:', error);
    res.status(500).json({ status: 500, message: 'Failed to check user block status' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE user_id = ?';
    const userResult = await conn.query(userQuery, [userId]);

    if (userResult.length === 0) {
      // User does not exist
      return res.status(404).json({ status: 404, message: 'User does not exist' });
    }

    // Delete the user
    const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
    await conn.query(deleteQuery, [userId]);

    res.status(200).json({ status: 200, message: 'User deleted successfully' });
  } catch (error) {
    console.log('Error deleting user:', error);
    res.status(500).json({ status: 500, message: 'Failed to delete user' });
  }
};

async function editStriker(req, res) {
  try {
    const { id, name, price } = req.body;
    
    const updateQuery = 'UPDATE shop_strikers_list SET name = ?, price = ? WHERE id = ?';

    await conn.query(updateQuery, [name, price, id]);
    console.log("Striker edited successfully");
    res.status(200).json({ status: 200, message: "Striker edited successfully" });
  } catch (error) {
    console.log("Error editing striker:", error);
    res.status(500).json({ status: 500, message: "Failed to edit striker" });
  }
}



const blockTournament = async (req, res) => {
  try {
    const { id, block } = req.body;
    const status = block ? 1 : 0;
    
    const updateQuery = 'UPDATE tournment SET status = ? WHERE id = ?';
    await conn.query(updateQuery, [status, id]);
    
    res.status(200).json({ status: 200, message: 'Tournament status updated successfully' });
  } catch (error) {
    console.log('Error updating tournament status:', error);
    res.status(500).json({ status: 500, message: 'Failed to update tournament status' });
  }
};


const Tournmentlist = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let tournmentdata = [];
  let tournmentListSend = false;

  try {
    const sql = `SELECT * FROM tournment`;
    const agent = await conn.query(sql);

    if (agent.length > 0) {
      statusCode = 200;
      message = "Data sent successfully";

      for (let i = 0; i < agent.length; i++) {
        const tournmentDetail = {
          id: agent[i].id,
          tournment_id: agent[i].tournment_id,
          tournment_name: agent[i].tournment_name,
          reward: agent[i].reward,
          entryfee: agent[i].entryfee,
          status: agent[i].status,
        };

        if (tournmentDetail.status !== 1) {
          tournmentdata.push(tournmentDetail);
        }
      }

      tournmentListSend = true;
    } else {
      statusCode = 404;
      message = "Tournaments not found";
    }

    const responseData = {
      status: statusCode,
      message,
      tournmentdata,
      tournmentListSend,
    };

    res.send(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Database error");
  }
};


const TournmentlistForAdmin = async (req, res) => {
  let message = null;
  let statusCode = 400;
  let data = {};
  let tournmentListSend = false;
  try {
    let sql = `SELECT * FROM tournment `;
    const agent = await conn.query(sql);
    if (agent.length > 0) {
      statusCode = 200;
      message = "data sent successfully";
      var tournmentdata = []
      var tournmentDetail
      for (var i = 0; i < agent.length; i++) {
        tournmentDetail = {}
        tournmentDetail.id = agent[i].id,
        tournmentDetail.tournment_id = agent[i].tournment_id,
          tournmentDetail.tournment_name = agent[i].tournment_name,
          tournmentDetail.reward = agent[i].reward,
          tournmentDetail.entryfee = agent[i].entryfee,
          tournmentDetail.status = agent[i].status,
          tournmentdata.push(tournmentDetail)
        tournmentDetail = {}
      }
      tournmentListSend = true;
    } else {
      statusCode = 404;
      message = "Agent not found";
    }
    const responseData = {
      status: statusCode,
      message,
      tournmentdata,
      tournmentListSend,
    };
    res.send(responseData);
  } catch (error) {
    console.log(error)
    res.status(500).send("Database error");
  }
}

async function editTournament(req, res) {
  try {
    const { id, tournment_name, reward, entryfee } = req.body;
    
    const updateQuery = 'UPDATE tournment SET tournment_name = ?, reward = ?, entryfee = ? WHERE id = ?';

    await conn.query(updateQuery, [tournment_name, reward, entryfee, id]);
    console.log("Tournament edited successfully");
    res.status(200).json({ status: 200, message: "Tournament edited successfully" });
  } catch (error) {
    console.log("Error editing tournament:", error);
    res.status(500).json({ status: 500, message: "Failed to edit tournament" });
  }
}




module.exports = {
  WinnerListFetch,
  DeductBalance,
  AddBalance,
  adminRevenue,
  setServiceCharge,
  fetchServiceCharge,
  fetchAdminRevenue,
  addStriker,
  getStrikerList,
  deleteStriker,
  deleteTournament,
  submitMinMax,
  getCurrentMinMax,
  blockUser,
  isUserBlocked,
  deleteUser,
  editStriker,
  blockTournament,
  Tournmentlist,
  TournmentlistForAdmin,
  editTournament,

  verifyKyc,
  completeKyc,

  SubmitWithdrawRequest,
  fetchbalance,
  fetchequippedStrikerIndex,
  equippedStrikerIndex,
  fetchPurchaseStrikerIndex,
  SendPurchaseStrikerIndex,
  shopStrikersList,
  HistoryDetail,
  Historylist,
  t,

  Tournments,
  sendWinningName,
  AddCashAmountList,
  acceptPayouts,
  VerifyAccountStatus,
  withdrawRequestHistory,
  carromTournment,
  carromTournments,
  getPlayerData,
  getPlayerIdData,
  getPlayerHistoryData,
  LuckyDicegetPlayerHistoryData,

  //getAllPlayerData,
  WheelOfFortunegetPlayerHistoryData,
  PokergetPlayerHistoryData,
  TigerVsElephantgetPlayerHistoryData,
  LuckyBallgetPlayerHistoryData,
  Transaction,
  PointTransfer,
  PointReceive,
  PointCancel,
  PointRejected,
  GameReport,
  DailyStatus,
  getPlayerPointHistory,
  sendPoints,
  sendPointstoPlayer,

  withdrawRequest,
  getwithdrawRequest,
  UPI,
  getUPI,
  Bank,
  fetchUPIBank,
  getBank,
  getfetchBank,
  DailyBonus,
  referCode,
  /* getStokezPointHistory,
    getAgentPointHistory,
    getPlayerPointHistory,
    getDoubleChanceHistory,
    getJeetoJokerHistory,
    get16CardsHistory,
    getSpinGameHistory,
 */
};
