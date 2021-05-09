// const minEmployeeID_GC = 1;
// const maxEmployeeID_GC = 100;
// const minEmployeeID_SE = 1;
// const maxEmployeeID_SE = 500;
// const minEmployeeID_OT = 1;
// const maxEmployeeID_OT = 2500;

// const employeeIDRanges = new Map();
// employeeIDRanges.set(1, [1, 100]);
// employeeIDRanges.set(2, [1, 500]);
// employeeIDRanges.set(3, [1, 2500]);

const minDate = new Date("2021-01-01T00:00");
const maxDate = new Date();

const minNumComments = 0;
const maxNumComments = 3;

const minNumReactions = 0;
const maxNumReactions = 10;

const minReactionID = 0;
const maxReactionID = 3;

const numRecognitionsPerCompany = 100;

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

const commentMessages = [
    "You guys rock!",
    "Great work.",
    "Wish I could've seen it!",
    "Exemplary!",
    "Another job well done.",
    "Keep up the good work."
]

// const recognitionTemplates = new Map();
// recognitionTemplates.set(1, recognitionTemplates_GC);
// recognitionTemplates.set(2, recognitionTemplates_SE);
// recognitionTemplates.set(3, recognitionTemplates_OT);

const company_GC = {
    companyID: 1,
    minEmployeeID: 1,
    maxEmployeeID: 100,
    recognitionTemplates: recognitionTemplates_GC
}

const company_SE = {
    companyID: 2,
    minEmployeeID: 1,
    maxEmployeeID: 500,
    recognitionTemplates: recognitionTemplates_SE
}

const company_OT = {
    companyID: 3,
    minEmployeeID: 1,
    maxEmployeeID: 2500,
    recognitionTemplates: recognitionTemplates_OT
}

var allRecognitions = [];

allRecognitions = allRecognitions.concat(getRecognitions(company_GC, numRecognitionsPerCompany));
allRecognitions = allRecognitions.concat(getRecognitions(company_SE, numRecognitionsPerCompany));
allRecognitions = allRecognitions.concat(getRecognitions(company_OT, numRecognitionsPerCompany));

db.Recognitions.insertMany(allRecognitions);

function getRecognitions(company, numRecognitions) {
    const recognitions = [];

    for (var i = 0; i < numRecognitions; i++) {
        recognitions.push(
            getRecognition(
                company,
                minDate,
                maxDate,
                minNumComments,
                maxNumComments,
                minNumReactions,
                maxNumReactions,
                minReactionID,
                maxReactionID,
                commentMessages
            )
        );
    }

    return recognitions;
}

function getRecognition(
    company,
    minDate,
    maxDate,
    minNumComments,
    maxNumComments,
    minNumReactions,
    maxNumReactions,
    minReactionID,
    maxReactionID,
    commentMessages
) {
    // const companyEmployeeIDRanges = employeeIDRanges[companyID];
    // const companyRecognitionTemplates = recognitionTemplates[companyID];
    // const recognitionTemplate = companyRecognitionTemplates[getRandomInteger(0, 5)];
    const giverID = getRandomEmployeeID(company);
    var receiverID = getRandomEmployeeID(company);

    while (receiverID == giverID) {
        receiverID = getRandomEmployeeID(company);
    }

    const recognitionTemplate = getRandomElement(company.recognitionTemplates);
    const creationDate = getRandomDate(minDate, maxDate);

    return {
        companyID: companyID,
        giverID: giverID,
        receiverID: receiverID,
        values: recognitionTemplate.values,
        message: recognitionTemplate.message,
        creationDate: creationDate,

        comments: getComments(
            company,
            minNumComments,
            maxNumComments,
            creationDate,
            maxDate,
            commentMessages
        ),

        reactions: getReactions(
            company,
            minNumReactions,
            maxNumReactions,
            minReactionID,
            maxReactionID
        )
    }
}

function getComment(company, commentMessages, minDate, maxDate) {
    return {
        commenterID: getRandomEmployeeID(company),
        message: getRandomElement(commentMessages),
        creationDate: getRandomDate(minDate, maxDate),
        likeGiverIDs: getRandomEmployeeIDs(company)
    };
}

function getComments(
    company,
    minNumComments,
    maxNumComments,
    minDate,
    maxDate,
    commentMessages
) {
    const numComments = getRandomInteger(minNumComments, maxNumComments);
    const comments = [];

    for (var i = 0; i < numComments; i++) {
        commentMessages.push(getComment(company, commentMessages, minDate, maxDate));
    }

    return commentMessages;
}

function getReaction(company, minReactionID, maxReactionID) {
    return {
        reactionID: getRandomInteger(minReactionID, maxReactionID),
        reactionGiverIDs: getRandomEmployeeIDs(company)
    }
}

function getReactions(
    company,
    minNumReactions,
    maxNumReactions,
    minReactionID,
    maxReactionID
) {
    const numReactions = getRandomInteger(minNumReactions, maxNumReactions);
    const reactions = [];

    for (var i = 0; i < numReactions; i++) {
        reactions.push(getReaction(company, minReactionID, maxReactionID));
    }

    return reactions;
}

function getRandomElement(array) {
    return array[0, getRandomInteger(0, array.length - 1)];
}

function getRandomEmployeeID(company) {
    return getRandomInteger(company.minEmployeeID, company.maxEmployeeID);
}

function getRandomEmployeeIDs(company, minNumEmployeeIDs, maxNumEmployeeIDs) {
    const numEmployeeIDs = getRandomInteger(minNumEmployeeIDs, maxNumEmployeeIDs);
    const employeeIDs = [];

    for (var i = 0; i < numEmployeeIDs; i++) {
        const employeeID = getRandomEmployeeID(company);

        if (!employeeIDs.includes(employeeID)) {
            employeeIDs.push(employeeID);
        }
    }

    return employeeIDs;
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