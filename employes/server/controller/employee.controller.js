const employeeController =  {};
const Employee = require('../models/employee');

employeeController.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};

employeeController.storeEmployee =  async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({
        status: `Empleado ${employee.name} ha sido guardado`,
        code: 201,
        data: employee
    });
};

employeeController.showEmployee = async (req, res) => {
    const employeeShow = await Employee.findById(req.params.id);
    res.json({
        status: 'Encontrado',
        code: 200,
        data:  employeeShow
    });
};

employeeController.updateEmployee =  async (req, res) => {
    const {id} = req.params;
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salario: req.body.salario
    };
    console.log(id,employee);
    const updte = await Employee.findOneAndUpdate(id, {$set: employee}, {new: true});
    res.json({
        status: 'ACTUALIZADO',
        code: 200,
        data: updte
    });
};

employeeController.deleteEmployee =  async (req, res) => {
    const {id} = req.params;
    const del = await Employee.findByIdAndRemove(id);
    res.json({
        status: 'eliminado',
        code: 200,
        data: del
    });
};

module.exports = employeeController;