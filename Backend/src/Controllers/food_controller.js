const foodModel = require('../model/Food_model');
const stroageService = require("../services/storage_service")

async function createFood(req,res){
console.log(req.body);
console.log(req.file);

    // Check if req.foodpartner exists
    if (!req.foodpartner || !req.foodpartner.id) {
        return res.status(400).json({ message: "Food partner information is missing" });
    }

const { v4: uuid } = await import('uuid');
const fileuploadResult = await stroageService.uploadFile(req.file.buffer, uuid())

const foodItm = await foodModel.create({
    name:req.body.name,
    description:req.body.description,
    video:fileuploadResult.url,
    foodpartner:req.foodpartner.id
})
res.status(201).json({
    message:"food created sucessfully",
    food:foodItm
})

}

module.exports = {
    createFood
}