const CartModel = require("../models/cart");

exports.createCart = async (req,res)=>{
    const {productId, name, price, image, quantity, email} = req.body;
    if(!productId || !name || !price || !image || !quantity || !email){
        res.status(400).json({message: "Product information is missing!"});
        return;
    }
    try{
        //Existing itme in out cart
        const existingItem = await CartModel.findOne({productId,email});
        if(existingItem){
            existingItem.quantity += quantity
            const data  = await existingItem.save();
            return res.json(data);
        }
        //add item to cart for the first time
        const cart = new CartModel({
            productId, 
            name, 
            price, 
            image, 
            quantity, 
            email,
        })
        const data = await cart.save();
        res.json(data);

    } catch (error){
        res.status(500).send({
            message: 
                error.message || "Something error occurred while adding new cart item",
          });
    }
};

// export.getCartItemsByEmail = async (req,res =>{
//     const email = req.params;
//     if(!email)
// })

exports.usdateCartItem = async(req,res)=>{
    const{id} = req.params;
    try{
        const cartItems = await CartModel.findByIdAndUpdate(id, req.body,{
            new:true,
            useFindAndModify:false,
        });
        if (!cartItems){
            return res.status(404).json({ message: "Cart items not found"});
        }
        res.json(cartItems);
    }catch (error){
        res.status(500).send({
            message:
                error.message ||
                "Something error occurred while updating cart item by email"
        });
    }
}