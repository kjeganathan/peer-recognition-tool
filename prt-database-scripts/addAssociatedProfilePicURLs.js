db.Recognitions.find().forEach(function (document) {
    db.Recognitions.update(
        { _id: document._id },
        {
            $set:
            {
                receiverProfilePicURL: getProfilePicURL(
                    document.receiverName,
                    document.companyID
                )
            }
        }
    );
    // setProfilePicURL(document);
});

function getProfilePicURL(fullName, companyID) {
    // const fullName = document.receiverName;
    const nameTokens = fullName.split(" ");

    if (nameTokens.length != 2) {
        // helper(document._id, "test-profile-pic-10.jpg");
        // return;
        return "test-profile-pic-10.jpg";
    }

    // const companyID = document.companyID;
    const firstName = nameTokens[0];
    const lastName = nameTokens[1];

    const query = {
        companyId: companyID,
        firstName: firstName,
        lastName: lastName
    }

    const employee = db.Employees.findOne(query)

    if (employee == null) {
        // helper(document._id, "test-profile-pic-10.jpg");
        return "test-profile-pic-10.jpg";
    }
    
    // helper(document._id, employee.profilePicURL);
    return employee.profilePicURL;
}

function helper(documentID, URL) {
    // db.Recognitions.update(
    //     { _id: documentID },
    //     {
    //         $set:
    //         {
    //             receiverProfilePicURL: URL
    //         }
    //     }
    // )
}
