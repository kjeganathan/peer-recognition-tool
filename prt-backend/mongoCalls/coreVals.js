const Company = require("../models/company.model.js");

async function getCoreValues(req, res) {
    const companyID = req.user.companyId;
    const comp = await Company.findOne({ companyId: companyID });
    companyValues = []
    comp.values.forEach(core => {
      companyValues.push({
            label: core,
            value: core
      })
      
  });
  console.log(companyValues)
  res.send(companyValues);
}

module.exports = { getCoreValues }