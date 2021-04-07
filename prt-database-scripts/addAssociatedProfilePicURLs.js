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
});

function getProfilePicURL(fullName, companyID) {
    const nameTokens = fullName.split(" ");

    if (nameTokens.length != 2) {
        return "test-profile-pic-10.jpg";
    }

    const firstName = nameTokens[0];
    const lastName = nameTokens[1];

    const query = {
        companyId: companyID,
        firstName: firstName,
        lastName: lastName
    }

    const employee = db.Employees.findOne(query)

    if (employee == null) {
        return "test-profile-pic-10.jpg";
    }
    
    return employee.profilePicURL;
}