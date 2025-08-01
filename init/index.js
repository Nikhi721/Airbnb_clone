const mongoose = require("mongoose");
const initdata =require("./data.js")
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust2";

main()
.then(()=>{
    console.log("connect to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
await mongoose.connect(`${MONGO_URL}`)
    
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initdata.data= initdata.data.map((obj)=>({
        ...obj,
        owner:"6882ffd0b9fcfadd91c0e4c8",
        geometry:{
            type:"Point",
            coordinates: obj.geometry?.coordinates || [0, 0], // fallback
        }
        
    }))
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};
initDB();
