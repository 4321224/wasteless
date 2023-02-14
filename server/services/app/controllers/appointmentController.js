const Appointment = require("../models/appointment");
const Slot = require("../models/slot");
const SendEmail = require("../helpers/nodemailer");
const { ObjectId } = require("mongodb");

class appointmentController {
	static async create(req, res) {
		const { postId } = req.params;
		const { id: userId, username, email, phoneNumber } = req.body;

		console.log(postId)
		console.log(req.body,"ini body")

		let slot_time = new Date().getHours();
		let slot_date = new Date().getDate();

		const newslot = new Slot({
			slot_time,
			slot_date,
			created_at: Date.now(),
		});
		// console.log(newslot, "<<< ini newslot");
		await newslot.save();

		const newappointment = new Appointment({
			userId,
			username,
			email,
			phoneNumber,
			slots: newslot._id,
			postId,
			created_at: Date.now(),
		});

		SendEmail(email, username);

		await newappointment.save();
		const newAppoinment = await Appointment.find().populate();
		const createNew = newAppoinment.forEach((el) => el._id);

		console.log(newAppoinment);

		res.status(200).json({ createNew, message: "success add appoinment" });
	}
	static async all(req, res) {
		const { postId } = req.params;
		const newAppointment = await Appointment.find({ postId }).populate();
		res.status(200).json(newAppointment);
	}
}

module.exports = appointmentController;