// let allFormatForm = document.querySelector('#allFormatForm');
// let arr = Array.from(allFormatForm.querySelectorAll('fieldset'));

// arr.forEach((fieldset) => {
//     let fieldsetId = fieldset.id;
//     let inputArray = Array.from(fieldset.querySelectorAll('input'));

//     inputArray.forEach((inputBox) => {
//         let inputBoxId = inputBox.id;
//         inputBox.name = `${fieldsetId}_${inputBoxId}`;
//     });
// });

// // // Delay to ensure changes are reflected
// setTimeout(() => {
//     // Get the container's HTML
//     const updatedHTML = document.querySelector('.container').outerHTML;

//     // Log the updated HTML
//     console.log(updatedHTML);

//     // Optionally, save the updated HTML as a file
//     const blob = new Blob([updatedHTML], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'updated_form.html';
//     link.click();
// }, 10000);





// const fs = require('fs');

// // Function to count entries in the JSON file
// function countEntries(fileName) {
//     fs.readFile(fileName, 'utf8', (err, data) => {
//         if (err) {
//             console.error(`Error reading file ${fileName}:`, err);
//             return;
//         }

//         try {
//             const jsonData = JSON.parse(data);
//             const count = Object.keys(jsonData).length;
//             console.log(`Total number of entries: in ${fileName} ${count}`);
//         } catch (parseError) {
//             console.error(`Error parsing JSON in file ${fileName}:`, parseError);
//         }
//     });
// }

// // Provide the file name
// const fileName = 'reducedList.json'; // Replace with the name of your JSON file
// const fileName2 = 'playerList.json'; // Replace with the name of your JSON file
// const fileName3 = 'updatedList.json'; // Replace with the name of your JSON file

// // Call the function
// countEntries(fileName);
// countEntries(fileName2);
// countEntries(fileName3);




// {
// const fs = require('fs');

// // Function to find missing entries
// function findMissingEntries(playerListFile, updatedListFile) {
//     // Read playerList.json
//     fs.readFile(playerListFile, 'utf8', (err, playerListData) => {
//         if (err) {
//             console.error(`Error reading file ${playerListFile}:`, err);
//             return;
//         }

//         // Parse playerList.json
//         const playerList = JSON.parse(playerListData);

//         // Read updatedList.json
//         fs.readFile(updatedListFile, 'utf8', (err, updatedListData) => {
//             if (err) {
//                 console.error(`Error reading file ${updatedListFile}:`, err);
//                 return;
//             }

//             // Parse updatedList.json
//             const updatedList = JSON.parse(updatedListData);

//             // Extract IDs from updatedList
//             const updatedIDs = new Set(
//                 Object.values(updatedList).map((entry) => entry.id)
//             );

//             // Find missing entries
//             const missingEntries = [];
//             for (const [playerName, details] of Object.entries(playerList)) {
//                 if (!updatedIDs.has(details.id)) {
//                     missingEntries.push(playerName);
//                 }
//             }

//             // Output missing entries
//             if (missingEntries.length > 0) {
//                 console.log(`Missing entries:`, missingEntries);
//             } else {
//                 console.log('No missing entries! All players are in the updated list.');
//             }
//         });
//     });
// }

// // Provide the file names
// const playerListFile = 'playerList.json'; // Replace with your player list file name
// const updatedListFile = 'updatedList.json'; // Replace with your updated list file name

// // Call the function
// findMissingEntries(playerListFile, updatedListFile);
// }


{
const fs = require('fs');

// Function to find missing entries in reducedList.json
function findMissingInReducedList(playerListFile, reducedListFile) {
    // Read playerList.json
    fs.readFile(playerListFile, 'utf8', (err, playerListData) => {
        if (err) {
            console.error(`Error reading file ${playerListFile}:`, err);
            return;
        }

        // Parse playerList.json
        const playerList = JSON.parse(playerListData);

        // Read reducedList.json
        fs.readFile(reducedListFile, 'utf8', (err, reducedListData) => {
            if (err) {
                console.error(`Error reading file ${reducedListFile}:`, err);
                return;
            }

            // Parse reducedList.json
            const reducedList = JSON.parse(reducedListData);

            // Extract IDs from reducedList
            const reducedIDs = new Set(Object.keys(reducedList));

            // Find missing entries
            const missingEntries = [];
            for (const [playerName, details] of Object.entries(playerList)) {
                if (details.id && !reducedIDs.has(details.id.toString())) {
                    missingEntries.push({ playerName, id: details.id });
                }
            }

            // Output missing entries
            if (missingEntries.length > 0) {
                console.log(`Missing entries:`);
                missingEntries.forEach((entry) => {
                    console.log(`- ${entry.playerName} (ID: ${entry.id})`);
                });
            } else {
                console.log('No missing entries! All players are in the reduced list.');
            }
        });
    });
}

// Provide the file names
const playerListFile = 'playerList.json'; // Replace with your player list file name
const reducedListFile = 'reducedList.json'; // Replace with your reduced list file name

// Call the function
findMissingInReducedList(playerListFile, reducedListFile);

}




// const fs = require('fs');

// // Function to update missing entries in updatedList.json
// function updateMissingEntries(playerListFile, updatedListFile) {
//     // Read playerList.json
//     fs.readFile(playerListFile, 'utf8', (err, playerListData) => {
//         if (err) {
//             console.error(`Error reading file ${playerListFile}:`, err);
//             return;
//         }

//         // Parse playerList.json
//         const playerList = JSON.parse(playerListData);

//         // Read updatedList.json
//         fs.readFile(updatedListFile, 'utf8', (err, updatedListData) => {
//             if (err) {
//                 console.error(`Error reading file ${updatedListFile}:`, err);
//                 return;
//             }

//             // Parse updatedList.json
//             const updatedList = JSON.parse(updatedListData);

//             // Extract IDs from updatedList
//             const updatedIDs = new Set(
//                 Object.values(updatedList).map((entry) => entry.id)
//             );

//             // Find and add missing entries to updatedList
//             for (const [playerName, details] of Object.entries(playerList)) {
//                 if (!updatedIDs.has(details.id)) {
//                     updatedList[playerName] = details;
//                     console.log(`Added missing entry: ${playerName}`);
//                 }
//             }

//             // Write the updated list back to file
//             fs.writeFile(
//                 updatedListFile,
//                 JSON.stringify(updatedList, null, 2),
//                 (err) => {
//                     if (err) {
//                         console.error(`Error writing to file ${updatedListFile}:`, err);
//                     } else {
//                         console.log(`Updated list successfully saved to ${updatedListFile}`);
//                     }
//                 }
//             );
//         });
//     });
// }

// // Provide the file names
// const playerListFile = 'playerList.json'; // Replace with your player list file name
// const updatedListFile = 'updatedList.json'; // Replace with your updated list file name

// // Call the function
// updateMissingEntries(playerListFile, updatedListFile);









const fs = require('fs');

// Function to check for mismatches or duplications
function checkForMismatches(updatedList, reducedList) {
    let mismatches = [];
    let missingInReducedList = [];

    // Create a reverse mapping of reducedList where key is the name and value is the id
    const reducedListByName = {};
    for (let id in reducedList) {
        reducedListByName[reducedList[id].name] = id;
    }

    // Check updatedList against reducedListByName for mismatches
    for (let name in updatedList) {
        const id = updatedList[name].id;

        if (reducedListByName[name]) {
            if (reducedListByName[name] !== id.toString()) {
                mismatches.push({
                    name: name,
                    updatedId: id,
                    reducedId: reducedListByName[name]
                });
            }
        } else {
            missingInReducedList.push({
                name: name,
                id: id
            });
        }
    }

    return { mismatches, missingInReducedList };
}

// Read files and perform checks
const updatedListPath = './updatedList.json';
const reducedListPath = './reducedList.json';

fs.readFile(updatedListPath, 'utf-8', (err, updatedData) => {
    if (err) {
        console.error(`Error reading ${updatedListPath}:`, err);
        return;
    }

    fs.readFile(reducedListPath, 'utf-8', (err, reducedData) => {
        if (err) {
            console.error(`Error reading ${reducedListPath}:`, err);
            return;
        }

        const updatedList = JSON.parse(updatedData);
        const reducedList = JSON.parse(reducedData);

        const { mismatches, missingInReducedList } = checkForMismatches(updatedList, reducedList);

        if (mismatches.length > 0) {
            console.log("Mismatches Found:");
            mismatches.forEach(mismatch => {
                console.log(`Name: ${mismatch.name} | Updated ID: ${mismatch.updatedId} | Reduced ID: ${mismatch.reducedId}`);
            });
        } else {
            console.log("No mismatches found.");
        }

        if (missingInReducedList.length > 0) {
            console.log("\nMissing Entries in Reduced List:");
            missingInReducedList.forEach(entry => {
                console.log(`Name: ${entry.name} | ID: ${entry.id}`);
            });
        } else {
            console.log("No missing entries found in Reduced List.");
        }
    });
});
