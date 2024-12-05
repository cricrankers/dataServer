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


async function scrap(rowNo,sectionId) {
    const section = document.getElementById(sectionId);
    const url = section.querySelector('.url-input').value;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    try {
        // Fetch HTML content asynchronously
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const html = data.contents;

        // Parse the HTML string into a document
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Find all tables with class "engineTable"
        const tables = doc.querySelectorAll('table.engineTable');

        // Find the table that contains the caption "Career averages"
        const careerAveragesTable = Array.from(tables).find((table) => {
            const caption = table.querySelector('caption');
            return caption && caption.innerText.trim() === 'Career averages';
        });

        if (careerAveragesTable) {
            console.log('Career Averages Table found!');

            // Extract the rows from the table
            const rows = careerAveragesTable.querySelectorAll('tr');
            console.log(rows)
            // The second row (filtered data) will be at index 2 (index 1 is the header row)
            const filteredRow = rows[rowNo];  // This is the "filtered" row

            if (filteredRow) {
                // Extract the columns from the filtered row
                const columns = filteredRow.querySelectorAll('td');

                // Extract the relevant data from the columns
                const debutYear = columns[1].innerText.trim().split('-')[0]; // Span
                const lastPlayedYear = columns[1].innerText.trim().split('-')[1]; // Span
                const matches = columns[2].innerText.trim();
                const innings = columns[3].innerText.trim();
                const runs = columns[5].innerText.trim();
                const average = columns[7].innerText.trim();
                const strikeRate = columns[9].innerText.trim();
                const fifties = columns[11].innerText.trim();
                const hundreds = columns[10].innerText.trim();


                // Populate the input fields dynamically
                if (debutYear) {
                    try {
                        section.querySelector("#debut").value = debutYear; 
                    } catch (error) {
                        console.log(".")
                    }
                    
                }

                if (lastPlayedYear) {
                    try {
                        section.querySelector("#last-played").value = lastPlayedYear;
                    } catch (error) {
                        console.log('..')
                    }
                }

                if (matches) {
                    section.querySelector("#matches").value = matches;
                }

                if (innings) {
                    section.querySelector("#innings").value = innings;
                }

                if (runs) {
                    section.querySelector("#runs").value = runs;
                }

                if (average) {
                    section.querySelector("#average").value = average;
                }

                if (strikeRate) {
                    section.querySelector("#strikeRate").value = strikeRate;
                }

                if (fifties) {
                    section.querySelector("#fifties").value = fifties;
                }

                if (hundreds) {
                    section.querySelector("#hundreds").value = hundreds;
                }

            } else {
                console.log('Filtered row not found!');
            }
        } else {
            console.log('Career Averages Table not found!');
        }
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
    }
}


