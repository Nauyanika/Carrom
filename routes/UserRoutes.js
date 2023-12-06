const router = require("express").Router();
// import auth controller
const UsersController = require("../controllers/UserController");
//const auth = require('../middleware/authVerification')
//import validation
//const check = require('../validation/CheckValidation')
/* router.post('/createDistrubutor',check.distValidator(),UsersController.createDistrubutor)
router.post('/createStokez',check.stokezValidator(),UsersController.createStokez)
router.post('/createAgent',check.agentValidator(),UsersController.createAgent)
router.post('/createPlayer',check.playerValidator(),UsersController.createPlayer)



router.post('/createUser',check.userValidator(),UsersController.createUser)

router.post('/sendPoints',check.userPointsVal(),UsersController.sendPoints)
router.post('/sendStokezPoints',check.stokezPointsVal(),UsersController.sendPointstoStokez)
router.post('/sendAgentPoints',check.agentPointsVal(),UsersController.sendPointstoAgent)
router.post('/sendPlayerPoints',check.playerPointsVal(),UsersController.sendPointstoPlayer)


 */

//router.post('/transferPoints',UsersController.transferPoints)


router.post('/completeKyc', UsersController.completeKyc);
router.post('/verifyKyc', UsersController.verifyKyc);

router.get("/getPlayer", UsersController.getPlayerData);
router.get("/getPlayerId", UsersController.getPlayerIdData);
router.get(
  "/WheelOfFortunegetPlayerHistory",
  UsersController.WheelOfFortunegetPlayerHistoryData
);
router.get("/PokergetPlayerHistory", UsersController.PokergetPlayerHistoryData);
router.get(
  "/TigerVsElephantgetPlayerHistory",
  UsersController.TigerVsElephantgetPlayerHistoryData
);
router.get(
  "/LuckyBallgetPlayerHistory",
  UsersController.LuckyBallgetPlayerHistoryData
);
router.get("/Transaction", UsersController.Transaction);
router.get(
  "/LuckyDicegetplayerHistory",
  UsersController.LuckyDicegetPlayerHistoryData
);

router.get("/TransactionHistory", UsersController.Transaction);
router.get("/PointTransferred", UsersController.PointTransfer);
router.get("/PointReceived", UsersController.PointReceive);
router.get("/PointCancel", UsersController.PointCancel);
router.get("/PointRejected", UsersController.PointRejected);
//router.get('/PointHistory',UsersController.PointHistory)

router.post("/sendPoints", UsersController.sendPoints);
router.post("/referCode", UsersController.referCode);

//router.post('/sendSuperMasterPoints',UsersController.sendPointstoSuperMaster)
//router.post('/sendMasterIdPoints',UsersController.sendPointstoMasterId)
router.post("/sendPlayerPoints", UsersController.sendPointstoPlayer);
router.get("/GameReport", UsersController.GameReport);
router.get("/DailyStatus", UsersController.DailyStatus);

/* 
//router.get('/getAllPlayer',UsersController.getAllPlayerData)



/* router.get('/pointsStokezHistory',UsersController.getStokezPointHistory)
router.get('/pointsAgentHistory',UsersController.getAgentPointHistory)
router.get('/pointsPlayerHistory',UsersController.getPlayerPointHistory)


router.get('/GameDoubleChanceHistory',UsersController.getDoubleChanceHistory)
router.get('/GameJeetoJokerHistory',UsersController.getJeetoJokerHistory)
router.get('/Game16CardsHistory',UsersController.get16CardsHistory)
router.get('/GameSpinGameHistory',UsersController.getSpinGameHistory)
 */

/* router.post('/changePassword',auth,UsersController.changePassword)
router.post('/resetPassword',check.changePass(),UsersController.resetPassword)
router.get('/',UsersController.getUsers)
router.get('/admindata',UsersController.getAdminData)
router.get('/AgentsData',UsersController.getAllAgents)

router.get('/agents',UsersController.getAgents)

router.get('/getStokez',UsersController.getStokez) */

// router.post('/profileUpload',UsersController.uploadProfilePic)
// router.get('/:id/avatar',UsersController.retrieveProfilePic)
// router.post('/friend_request',check.frientValidator(),UsersController.friendRequest)
// router.get('/find',UsersController.searchPlayers)
// router.get('/friend_req_notification/:user_id', UsersController.getFriendReqNotify)
// router.post('/friend_req_status_update', UsersController.updateFriendReqStatus)
/* router.get("/test", (req, res) => {
    res.send('sdfdfdfd')
}); */


router.get('/withdrawRequestHistory',UsersController.withdrawRequestHistory);


router.put('/VerifyBankAccountStatus',UsersController.VerifyAccountStatus)
router.put('/acceptPayouts',UsersController.acceptPayouts)












router.post("/withdrawRequest", UsersController.withdrawRequest);
router.get("/getwithdrawRequest", UsersController.getwithdrawRequest);

router.post("/UPI", UsersController.UPI);
router.get("/getUPI", UsersController.getUPI);
router.post("/DailyBonus", UsersController.DailyBonus);

router.post("/Bank", UsersController.Bank);

router.post("/fetchUPIBank", UsersController.fetchUPIBank);

router.post("/getfetchBank", UsersController.getfetchBank);

router.get("/getBank", UsersController.getBank);
router.get("/AddCashAmountList", UsersController.AddCashAmountList);






router.get('/carromTournment',UsersController.carromTournment)
router.post('/carromTournments',UsersController.carromTournments)
router.post('/sendWinningName',UsersController.sendWinningName)



router.post('/Tournments',UsersController.Tournments)

router.get('/Tournmentlist',UsersController.Tournmentlist)
router.get('/t',UsersController.t)











router.post('/HistoryDetail',UsersController.HistoryDetail)

router.post('/Historylist',UsersController.Historylist)






router.get('/shopStrikersList',UsersController.shopStrikersList)


router.post('/SendPurchaseStrikerIndex',UsersController.SendPurchaseStrikerIndex)
router.post('/fetchPurchaseStrikerIndex',UsersController.fetchPurchaseStrikerIndex)

router.post('/equippedStrikerIndex',UsersController.equippedStrikerIndex)


router.post('/fetchequippedStrikerIndex',UsersController.fetchequippedStrikerIndex)


router.post("/SubmitWithdrawRequest", UsersController.SubmitWithdrawRequest);
router.post("/fetchbalance", UsersController.fetchbalance);

router.post('/AddBalance',UsersController.AddBalance)
router.post('/DeductBalance',UsersController.DeductBalance)
router.post("/adminRevenue", UsersController.adminRevenue);
router.post("/setServiceCharge", UsersController.setServiceCharge);
router.get("/fetchServiceCharge", UsersController.fetchServiceCharge);
router.get("/fetchAdminRevenue", UsersController.fetchAdminRevenue);

router.post('/submitMinMax', UsersController.submitMinMax);
router.get('/currentMinMax', UsersController.getCurrentMinMax);
router.post('/addStriker',UsersController.addStriker)
router.get('/getStrikerList',UsersController.getStrikerList)
router.delete('/deleteStriker/:strikerId', UsersController.deleteStriker);
router.post('/deleteTournament', UsersController.deleteTournament);
router.put('/block/:userId', UsersController.blockUser);
router.post('/isUserBlocked', UsersController.isUserBlocked);
router.delete('/deleteUser/:userId', UsersController.deleteUser);
router.post('/editStriker', UsersController.editStriker);
router.put('/blockTournament', UsersController.blockTournament);
router.get('/TournmentlistForAdmin',UsersController.TournmentlistForAdmin)
router.post('/editTournament', UsersController.editTournament);

router.get('/WinnerListFetch',UsersController.WinnerListFetch)

module.exports = router;
