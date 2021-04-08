const minDate = new Date("2020-01-01T00:00:00");
const minCompanyID = 1;
const maxCompanyID = 3;

for(var i=0; i<numMonths; i++){
    // for()
}

// const minDate = new Date("2020-01-01T00:00:00");
// const maxDate = new Date();

// db.Recognitions.find().forEach(function(document){
//     db.Recognitions.update(
//         {_id: document._id},
//         {$set:
//             {
//                 creationTime: getRandomDate(minDate, maxDate)
//             }
//         }
//     )
// });

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