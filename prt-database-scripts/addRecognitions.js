const minDate = new Date("2021-01-01T00:00");
const maxDate = new Date();

const minReactionID = 0;
const maxReactionID = 3;

const minNumReactionGivers = 0;
const maxNumReactionGivers = 10;

const minNumComments = 0;
const maxNumComments = 5;

const minNumLikes = 0;
const maxNumLikes = 10;

const numRecognitionsPerCompany = 20;

const commentMessages = [
    "You guys rock!",
    "Great work.",
    "Wish I could've seen it!",
    "Exemplary!",
    "Another job well done.",
    "Keep up the good work."
];

const recognitionTemplate_GC1 = {
    values: ["Collaboration"],
    message: "Thanks for helping me debug my code."
}

const recognitionTemplate_GC2 = {
    values: ["Mentoring"],
    message: "I appreciated you teaching me the new framework."
}

const recognitionTemplate_GC3 = {
    values: ["Collaboration", "Mentoring"],
    message: "Good job getting the interns up to speed."
}

const recognitionTemplate_GC4 = {
    values: [],
    message: "Good job with the client presentation."
}

const recognitionTemplate_GC5 = {
    values: ["Collaboration"],
    message: "Thanks for helping out the accounting department."
}

const recognitionTemplate_SE1 = {
    values: [],
    message: "Excellent work with sales today."
}

const recognitionTemplate_SE2 = {
    values: ["Selfless"],
    message: "Thanks for pulling crunch with me. Couldn't have done it without you."
}

const recognitionTemplate_SE3 = {
    values: ["Mentoring"],
    message: "Good job showing how to use the new in-house software."
}

const recognitionTemplate_SE4 = {
    values: ["Collaboration"],
    message: "You really pulled the team together yesterday."
}

const recognitionTemplate_SE5 = {
    values: ["Innovation"],
    message: "Your novel approach was what we needed to meet our goals."
}

const recognitionTemplate_OT1 = {
    values: [],
    message: "That customer seemed very happy with your help yesterday."
}

const recognitionTemplate_OT2 = {
    values: ["Selfless"],
    message: "Thanks for staying late to fix the data error."
}

const recognitionTemplate_OT3 = {
    values: ["Nimble"],
    message: "Thanks to you we shipped just before deadline."
}

const recognitionTemplate_OT4 = {
    values: ["Mentoring"],
    message: "Your input set a great starting point for the team."
}

const recognitionTemplate_OT5 = {
    values: ["Selfless", "Nimble"],
    message: "Thanks for taking the time to make that hotfix!"
}

const recognitionTemplates_GC = [
    recognitionTemplate_GC1,
    recognitionTemplate_GC2,
    recognitionTemplate_GC3,
    recognitionTemplate_GC4,
    recognitionTemplate_GC5
];

const recognitionTemplates_SE = [
    recognitionTemplate_SE1,
    recognitionTemplate_SE2,
    recognitionTemplate_SE3,
    recognitionTemplate_SE4,
    recognitionTemplate_SE5
];

const recognitionTemplates_OT = [
    recognitionTemplate_OT1,
    recognitionTemplate_OT2,
    recognitionTemplate_OT3,
    recognitionTemplate_OT4,
    recognitionTemplate_OT5
];

const employees_GC = db.employees.find({ companyId: 1 }).toArray();
const employees_SE = db.employees.find({ companyId: 2 }).toArray();
const employees_OT = db.employees.find({ companyId: 3 }).toArray();

const company_GC = db.companies.findOne({ companyId: 1 });
const company_SE = db.companies.findOne({ companyId: 2 });
const company_OT = db.companies.findOne({ companyId: 3 });


company_GC.recognitionTemplates = recognitionTemplates_GC;
company_GC.employees = employees_GC;

company_SE.recognitionTemplates = recognitionTemplates_SE;
company_SE.employees = employees_SE;

company_OT.recognitionTemplates = recognitionTemplates_OT;
company_OT.employees = employees_OT;

var allRecognitions = [];

db.recognitions.remove({});
insertRecognitions(company_GC, numRecognitionsPerCompany);
insertRecognitions(company_SE, numRecognitionsPerCompany);
insertRecognitions(company_OT, numRecognitionsPerCompany);

// for(var i=0; i<numRecognitionsPerCompany; i++){
//     insertRecognition(company_GC);
//     insertRecognition(company_SE);
//     insertRecognition(company_OT);
// }

function insertRecognitions(company, numRecognitions){
    for(var i=0; i<numRecognitions; i++){
        insertRecognition(company);
    }
}

function insertRecognition(company) {
    const giverReceiverPair = getRandomEmployees(company.employees, 2);
    const recognitionTemplate = getRandomElement(company.recognitionTemplates);
    const recognitionCreationDate = getRandomDate(minDate, maxDate);
    // const reactions = [];

    // for (var i = minReactionID; i <= maxReactionID; i++) {
    //     const numReactionGivers = getRandomInteger(minNumReactionGivers, maxNumReactionGivers);

    //     reactions.push(
    //         {
    //             reactionID: i,
    //             reactionGivers: getRandomEmployees(company.employees, numReactionGivers)
    //         }
    //     );
    // }

    // const comments = [];
    // const numComments = getRandomInteger(minNumComments, maxNumComments);

    // for (var i = 0; i < numComments; i++) {
    //     const numLikes = getRandomInteger(minNumLikes, maxNumLikes);
    //     var commentCreationDate;

    //     if (comments.length == 0) {
    //         commentCreationDate = getRandomDate(recognitionCreationDate, maxDate);
    //     } else {
    //         commentCreationDate = getRandomDate(comments[i - 1].creationDate, maxDate);
    //     }

    //     comments.push(
    //         {
    //             commenter: getRandomEmployee(company.employees),
    //             message: getRandomElement(commentMessages),
    //             creationDate: commentCreationDate,
    //             likeGivers: getRandomEmployees(company.employees, numLikes)
    //         }
    //     )
    // }

    db.recognitions.insert(
        {
            company: company._id,
            giver: giverReceiverPair[0],
            receiver: giverReceiverPair[1],
            coreValues: recognitionTemplate.values,
            message: recognitionTemplate.message,
            creationDate: recognitionCreationDate,
            // reactions: reactions,
            // comments: comments
        }
    );
}

function getRandomEmployees(employees, numEmployees) {
    const randomEmployees = [];

    while (randomEmployees.length < numEmployees) {
        const employee = getRandomEmployee(employees);

        if (!randomEmployees.includes(employee)) {
            randomEmployees.push(employee);
        }
    }

    return randomEmployees;
}

function getRandomEmployee(employees) {
    return getRandomElement(employees)._id;
}

function getRandomElement(array) {
    return array[getRandomInteger(0, array.length - 1)];
}

function getRandomDate(minDate, maxDate) {
    const minDateTime = minDate.getTime();
    const maxDateTime = maxDate.getTime();
    const randomDateTime = getRandomInteger(minDateTime, maxDateTime);
    return new Date(randomDateTime);
}

function getRandomInteger(min, max) {
    const range = max - min;
    return Math.floor(Math.random() * (range + 1)) + min;
}