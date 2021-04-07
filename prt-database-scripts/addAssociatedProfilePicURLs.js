// const minDate = new Date("2020-01-01T00:00:00");
// const maxDate = new Date();

db.Recognitions.find().forEach(function (document) {
    // db.Recognitions.update(
    //     {_id: document._id},
    //     {$set:
    //         {
    //             receiverProfilePicURL: getRandomDate(minDate, maxDate)
    //         }
    //     }
    // )
    // helper(document)
    setProfilePicURL(document);
});

function setProfilePicURL(document) {
    const fullName = document.receiverName;
    const nameTokens = fullName.split(" ");

    if (nameTokens.length != 2) {
        // return "test-profile-pic-10.jpg";
        helper(document._id, "test-profile-pic-10.jpg");
        return;
    }

    const companyID = document.companyID;
    const firstName = nameTokens[0];
    const lastName = nameTokens[1];
    const query = 
    const employee = db.Employees.findOne({ firstName: firstName, lastName: lastName })
    // // .then()
    //     .then(callback)
    //     .catch(error => print(error));

    if (employee == null) {
        helper(document._id, "test-profile-pic-10.jpg");
        return;
    }
    
    helper(document._id, employee.profilePicURL);
    return;
}

function helper(documentID, URL) {
    db.Recognitions.update(
        { _id: documentID },
        {
            $set:
            {
                receiverProfilePicURL: URL
            }
        }
    )
}

function callback(employee) {
}

// function getRandomDate(minDate, maxDate){
//     const minDateTime = minDate.getTime();
//     const maxDateTime = maxDate.getTime();
//     const randomDateTime = databaseHelper.getRandomInteger(minDateTime, maxDateTime);
//     return new Date(randomDateTime);
// }

// function getRandomInteger(min, max){
//     const range = max - min;
//     return Math.floor(Math.random() * (range + 1)) + min;
// }