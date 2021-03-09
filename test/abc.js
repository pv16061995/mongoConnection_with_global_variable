module.exports = async () => {
    let xyz = await global.con;
    let dbCon = await xyz.db("ORDERBOOK_BTC");
    let Data_1Day = {
        openDate: 1,
        time: "xqu"
    }
    let rs = await dbCon.collection("1day").updateOne({ _id: Data_1Day.openDate }, { $set: Data_1Day }, { upsert: true });
    console.log("connect", rs);
}


