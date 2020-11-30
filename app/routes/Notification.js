const express = require("express")
const router = express.Router()
// const admin = require('../admin/firebase-config')
var admin = require("firebase-admin");
var serviceAccount = require("../admin/serviceAccountKey.json");






console.log(new Date)

router.post('/notification',async(req, res) => {
    
   await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://blood-a.firebaseio.com"
    });

    
    // let a = "AAAA3vjTusM:APA91bFqHb_U-GS0jy4mHMzKTBkuS90Mjbal_N8vyt1SZQ_aLjDdyKB54XFdlvZS9lo5K9azgQX0xuTNFXjBGWy8VahnPxUxHdwQbn3BSNoh8riAFqNnf7cYLXgBNmDbq6B3bMT8mBmo"
    // var message = {
    //     data: {
    //       score: '850',
    //       time: '2:45'
    //     },
    //     token: a
    //   };
      

      await admin.messaging().sendMulticast({
        tokens: [
          /* ... */
          "fZRwWnLxQ1Gxrjg988D4eE:APA91bFmLYQ12v-QNLBTphW0J1vdMp2enz-U8pLbyoY0W79YZnVnz_v2-w9t8PS7LtHXUYGMhsOoK76MgaBVbacEB3CrXNlPZYKXqaxEOE06yR_XfTT_EZZg88rVvwDYzumsPfL8hQYW"
        ], // ['token_1', 'token_2', ...]
        notification: {
          title: 'Basic Notification',
          body: 'This is a basic notification sent from the server!',
          imageUrl: 'https://i.pinimg.com/736x/a4/d4/80/a4d4803a121a6dd1d7742b57897e4dbc.jpg',
        },
      })
        .then(response => {
            res.status(200).send("Notification sent successfully")

        })
        .catch(error => {
            console.log(error);
            res.status(200).send(error)
        });

})



module.exports = router
