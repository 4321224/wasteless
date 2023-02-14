"use strict";
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		let insertData = require("./users.json").map((el) => {
			el.password = hashPassword(el.password);
			el.createdAt = el.updatedAt = new Date();
			el.balance = 0;
			el.points = 0;
			return el;
		});
		console.log(insertData);
		await queryInterface.bulkInsert("Users", insertData, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Users", null);
	},
};
