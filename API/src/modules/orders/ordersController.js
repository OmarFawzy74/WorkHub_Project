
import order from "../../../DB/models/order_model.js";

//Unfinished Tasks

// 1. Check Freelancer Id
// 2. Check Client Id
// 3. Check Order Price

// Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await order.find();
        if(allOrders.length !== 0) {
            res.status(200).send(allOrders);
        }
        else {
            res.status(200).send("No orders found!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

// Add Order
export const addOrder = async (req, res) => {
    try {
        const newOrder = new order({
            ...req.body,
        });

        await newOrder.save();
        res.status(200).send("Order has been created successfuly.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

// Update Order
export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const orderToUpdate = await order.findById(orderId);

        if(orderToUpdate) {
            const filter = { _id: orderId }; // specify the condition to match the document
            const update = { $set: { orderImage_url: req.body.orderImage_url, freelancerId: req.body.freelancerId, clientId: req.body.clientId, orderTitle: req.body.orderTitle, orderPrice: req.body.orderPrice} }; // specify the update operation

            await order.updateOne(filter, update);
            res.status(200).send("Order has been updated successfuly.");
        }
        return res.status(200).send("There is no order with such id to update.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

// Delete Order
export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const orderToDelete = await order.findById(orderId);

        if(orderToDelete){
            const filter = { _id: orderId };

            await order.deleteOne(filter);
            res.status(200).send("Order has been deleted successfuly.");
        }
        else {
            res.status(200).send("There is no order with such id to delete.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}