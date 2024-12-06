const fs = require('fs');

// Function to read JSON files and transform the data
function transformLists(list1File, list2File, outputFile) {
    // Read the first list file
    fs.readFile(list1File, 'utf8', (err, list1Data) => {
        if (err) {
            console.error(`Error reading file ${list1File}:`, err);
            return;
        }
        
        // Parse the first list
        const list1 = JSON.parse(list1Data);

        // Read the second list file
        fs.readFile(list2File, 'utf8', (err, list2Data) => {
            if (err) {
                console.error(`Error reading file ${list2File}:`, err);
                return;
            }

            // Parse the second list
            const list2 = JSON.parse(list2Data);

            // Transform the keys in list1
            const transformedList = {};
            for (const [key, value] of Object.entries(list1)) {
                if (value && value.id) { // Check if id exists
                    const id = value.id.toString(); // Ensure id is treated as a string
                    if (list2[id]) {
                        const newName = list2[id].name;
                        transformedList[newName] = value; // Keep the original value object
                    }
                } else {
                    console.warn(`Missing 'id' for key: ${key}`);
                }
            }

            // Write the transformed list to the output file
            fs.writeFile(outputFile, JSON.stringify(transformedList, null, 2), (err) => {
                if (err) {
                    console.error(`Error writing to file ${outputFile}:`, err);
                } else {
                    console.log(`Transformed list successfully written to ${outputFile}`);
                }
            });
        });
    });
}

// Provide the file names
const list1File = 'playerList.json'; // Replace with the name of the first JSON file
const list2File = 'reducedList.json'; // Replace with the name of the second JSON file
const outputFile = 'updatedList.json'; // Replace with the desired output file name

// Call the function
transformLists(list1File, list2File, outputFile);
