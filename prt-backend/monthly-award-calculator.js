const Employee = require('./models/employee.model.js');
const Company = require("./models/company.model.js");
const Recognition = require("./models/recognition.model.js");
const MonthlyAward = require("./models/monthly-award.model.js");
const scheduler = require("node-schedule");

// const testRule = new scheduler.RecurrenceRule();
// testRule.second = [new scheduler.Range(0, 59)];
// // const testJobInterval = "/1 * * * * *";
// const testJob = scheduler.scheduleJob(testRule, testJobFunction);

// function testJobFunction(){
//   console.log("Tick");
// }

async function saveAwardWinners() {
    const companies = await Company.find({});
    companies.forEach(saveAwardWinnersOfCompany);
}

async function saveAwardWinnersOfCompany(company) {
    const coreValues = company.values;

    saveAwardWinnersHelper(company, recognition => true);

    coreValues.forEach(coreValue => {
        saveAwardWinnersHelper(company, recognition => recognition.values.includes(coreValue));
    });
}

async function saveAwardWinnersHelper(company, test) {
    const companyID = company.companyId;
    const recognitions = await Recognition.find({ companyID: companyID });
    const histogramAndMetadata = makeHistogramAndMetadata(recognitions, test);
    const maxNumRecognitions = histogramAndMetadata.maxNumRecognitions;
    const histogram = histogramAndMetadata.histogram;

    console.log(histogram);

    for (const [receiverID, numRecognitions] of histogram.entries()) {
        console.log("hi");
        console.log(receiverID);
        console.log(numRecognitions + "\n");
        if (numRecognitions == maxNumRecognitions) {
            const awardWinner = await Employee.findOne({
                companyId: companyID,
                employeeId: receiverID
            });

            const newRockstarAward = new MonthlyAward({
                awardName: "Rockstar of the Month",
                companyID: companyID,
                employeeID: awardWinner.companyId,

                employeeName: awardWinner.firstName +
                    " " +
                    awardWinner.lastName,

                dateGiven: new Date(),
                numRecognitions: numRecognitions,
                value: ""
            });

            newRockstarAward.save();
        }
    }
    // });
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

    // console.log(histogram);

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

async function saveAwardWinner(awardWinner) {
    // const awardWinner = await Employee.findOne({
    //     companyId: companyID,
    //     employeeId: receiverID
    // });

    const newRockstarAward = new MonthlyAward({
        awardName: "Rockstar of the Month",
        companyID: companyID,
        employeeID: awardWinner.companyId,

        employeeName: awardWinner.firstName +
            " " +
            awardWinner.lastName,

        dateGiven: new Date(),
        numRecognitions: numRecognitions,
        value: ""
    });

    newRockstarAward.save();
}

function rockstarTest(recognition) {
    return true;
}

// function coreValueTest(recogn){
//     return coreValueTestHelper(recognition, coreValue);
// }

function coreValueTest(recognition, coreValue) {
    const coreValues = recognition.values;
    return coreValues.includes(coreValue);
}

module.exports = saveAwardWinners;