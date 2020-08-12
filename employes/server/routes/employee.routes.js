const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const employeeCrl = require('../controller/employee.controller');
const employeeController = require('../controller/employee.controller');

router.get('/', employeeCrl.getEmployees);
router.post('/', employeeController.storeEmployee);
router.get('/:id', employeeController.showEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;