const Employee = require('./models/employee.model.js');
const Company = require("./models/company.model.js");
const Recognition = require("./models/recognition.model.js");
const MonthlyAward = require("./models/monthly-award.model.js");
// const scheduler = require("node-schedule");

async function saveAwardWinners() {
    const companies = await Company.find({});
    companies.forEach(saveAwardWinnersOfCompany);
}

async function saveAwardWinnersOfCompany(company) {
    const coreValues = company.values;

    saveAwardWinnersHelper(company, recognition => true, "Rockstar of the Month", "");

    coreValues.forEach(coreValue => {
        saveAwardWinnersHelper(company, recognition => recognition.values.includes(coreValue), coreValue + " Award", coreValue);
    });
}

async function saveAwardWinnersHelper(company, test, message, coreValue) {
    const companyID = company.companyId;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonthMinDate = new Date(currentYear, currentMonth);
    console.log(currentMonthMinDate);

    const recognitionsQuery = {
        companyID: companyID,
        creationTime: {
            $gte: currentMonthMinDate
        }
    }

    // const recognitions = await Recognition.find({ companyID: companyID });
    const recognitions = await Recognition.find(recognitionsQuery);
    // console.log(recognitions);
    const histogramAndMetadata = makeHistogramAndMetadata(recognitions, test);
    const maxNumRecognitions = histogramAndMetadata.maxNumRecognitions;
    const histogram = histogramAndMetadata.histogram;

    for (const [receiverID, numRecognitions] of histogram.entries()) {
        if (numRecognitions == maxNumRecognitions) {
            const awardWinner = await Employee.findOne({
                companyId: companyID,
                employeeId: receiverID
            });

            const newRockstarAward = new MonthlyAward({
                awardName: message,
                companyID: companyID,
                employeeID: awardWinner.companyId,

                employeeName: awardWinner.firstName +
                    " " +
                    awardWinner.lastName,

                dateGiven: new Date(),
                numRecognitions: numRecognitions,
                value: coreValue
            });

            newRockstarAward.save();
        }
    }
}

function makeHistogramAndMetadata(recognitions, test) {
    const histogram = new Map();
    var maxNumRecognitions = 0;

    recognitions.forEach(recognition => {
        const receiverID = recognition.receiverID;

        if (test(recognition) == true) {
            incrementHistogram(histogram, receiverID);
        }

        const numRecognitions = histogram.get(receiverID);

        if (numRecognitions > maxNumRecognitions) {
            maxNumRecognitions = numRecognitions;
        }
    });

    return {
        histogram: histogram,
        maxNumRecognitions: maxNumRecognitions
    };
}

function incrementHistogram(histogram, key) {
    if (histogram.has(key)) {
        const curValue = histogram.get(key);
        const newValue = curValue + 1;
        histogram.set(key, newValue);
    } else {
        histogram.set(key, 1);
    }
}

module.exports = saveAwardWinners;