const { Schema, model } = require("mongoose");

const ProductSchema= new Schema({
    product_name:{
        type:String,
        require:true
    },
    product_brand:{
        type:String,
        require:true
    },
    product_price:{
        type:String,
        require:true
    },
    product_ram:{
        type:String,
        require:true
    },
    product_storage:{
        type:String,
        require:true
    },
    product_camera:{
        type:String,
        require:true
    },
    product_image:{
        type:String,
        require:true
    },
    product_quantity:{
        type:String,
        require:true
    },
    product_status:{
        type:String,
        require:true
    }
})

const product=  model("Product",ProductSchema);

module.exports=product;