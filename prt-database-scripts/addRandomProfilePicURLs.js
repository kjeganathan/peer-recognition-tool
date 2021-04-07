const profilePicURLs = [];

for(var i=0; i<10; i++){
    profilePicURLs[i] = "test-profile-pic-0" + i + ".jpg";
}

db.Employees.find().forEach(function(document){
    db.Employees.update(
        {_id: document._id},
        {$set:
            {
                profilePicURL: getRandomProfilePicURL()
            }
        }
    )
});

function getRandomProfilePicURL(){
    return profilePicURLs[getRandomInteger(0, 9)];
}

function getRandomInteger(min, max){
    const range = max - min;
    return Math.floor(Math.random() * (range + 1)) + min;
}