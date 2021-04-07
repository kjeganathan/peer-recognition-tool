// const minDate = new Date("2019-01-01T00:00:00");
// const maxDate = new Date();
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
    // print(document.firstName);
});

// function getRandomDate(minDate, maxDate){
//     const minDateTime = minDate.getTime();
//     const maxDateTime = maxDate.getTime();
//     const randomDateTime = getRandomInteger(minDateTime, maxDateTime);
//     return new Date(randomDateTime);
// }

function getRandomProfilePicURL(){
    return profilePicURLs[getRandomInteger(0, 9)];
}

function getRandomInteger(min, max){
    const range = max - min;
    return Math.floor(Math.random() * (range + 1)) + min;
}