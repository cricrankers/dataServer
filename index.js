// ---------------------------- Utility Functions ---------------------------- //

/**
 * Renders a responsive table from an existing HTML table.
 * @param {HTMLElement} table - The original table to render.
 * @returns {HTMLElement} The responsive table or an error message.
 */
function renderTable(table) {
    if (table) {
        table.classList.add('career-averages-table');

        const rows = table.querySelectorAll('tbody tr');
        const headers = table.querySelectorAll('thead th');
        const captionText = table.querySelector('caption')?.innerText.trim() || 'Table';

        const responsiveTable = document.createElement('table');
        responsiveTable.classList.add('career-averages-table');

        // Add caption
        const caption = document.createElement('caption');
        caption.textContent = captionText;
        responsiveTable.appendChild(caption);

        // Add rows and headers
        headers.forEach((header, index) => {
            const row = document.createElement('tr');
            const headerCell = document.createElement('th');
            headerCell.textContent = header.textContent.trim();
            row.appendChild(headerCell);

            rows.forEach((dataRow) => {
                const dataCell = document.createElement('td');
                const data = dataRow.querySelectorAll('td')[index]?.textContent.trim() || '-';
                dataCell.textContent = data;
                row.appendChild(dataCell);
            });

            responsiveTable.appendChild(row);
        });

        return responsiveTable;
    } else {
        const container = document.getElementById('table-container');
        container.innerHTML = 'Career Averages table not found!';
    }
}

// ---------------------------- Event Handlers ---------------------------- //

/**
 * Handles the "fill-min" checkbox functionality to populate or clear inputs.
 */
document.querySelectorAll('.fill-min').forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        const fieldset = this.closest('fieldset');
        const inputs = fieldset.querySelectorAll('input[type="number"]');

        inputs.forEach((input) => {
            input.value = this.checked ? '0' : '';
        });
    });
});

function fillMin(){
    document.querySelectorAll('.fill-min').forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            const fieldset = this.closest('fieldset');
            const inputs = fieldset.querySelectorAll('input[type="number"]');
    
            inputs.forEach((input) => {
                input.value = this.checked ? '0' : '';
            });
        });
    });
    
}

/**
 * Handles the generation of input fields for each year based on debut and last years.
 */
function generateYear(event, yearId,type) {
    // Ensure the clicked element has the 'generate-btn' class
    if (!event.target.classList.contains('generate-btn')) return;

    // Find the closest '.field-generator' container
    const generator = event.target.closest('.field-generator');
    const debutYearInput = generator.querySelector('#debut-year');
    const lastYearInput = generator.querySelector('#last-year');
    const fieldsContainer = generator.querySelector('.fields-container');

    // Parse the years from the input fields
    const debutYear = parseInt(debutYearInput.value.trim(), 10);
    const lastYear = parseInt(lastYearInput.value.trim(), 10);

    // Validation to ensure the years are valid
    if (isNaN(debutYear) || isNaN(lastYear) || debutYear > lastYear) {
        alert('Please enter valid debut and last played years.');
        return;
    }

    let urlValue;
    
    // Clear previous fields if any
    fieldsContainer.innerHTML = '';
    const yearsCount = lastYear - debutYear + 1;

    // Loop through the years and generate fields for each year
    for (let i = 0; i < yearsCount; i++) {
        const yearLabel = debutYear + i;

        // Create a new fieldset for each year
        const fieldSet = document.createElement('fieldset');
        fieldSet.classList.add('margins');
        fieldSet.id = `${yearId}${yearLabel}`;

       if(type=='t20Wc'){
            urlValue = `https://stats.espncricinfo.com/ci/engine/player/253802.html?class=3;filter=advanced;orderby=default;spanmax2=31+dec+${yearLabel};spanmin2=1+jan+${yearLabel};spanval2=span;template=results;trophy=89;type=batting`;
       }
       if(type=='odiWc'){
           urlValue = `https://stats.espncricinfo.com/ci/engine/player/253802.html?class=2;filter=advanced;orderby=default;spanmax1=31+dec+${yearLabel};spanmin1=1+jan+${yearLabel};spanval1=span;template=results;trophy=12;type=batting`;
       }
       if(type == 'odi'){
           urlValue = `https://stats.espncricinfo.com/ci/engine/player/253802.html?class=2;filter=advanced;orderby=default;spanmax1=31+dec+${yearLabel};spanmin1=1+jan+${yearLabel};spanval1=span;template=results;type=batting`
       }
       if(type == 't20'){
        urlValue = `https://stats.espncricinfo.com/ci/engine/player/253802.html?class=3;filter=advanced;orderby=default;spanmax1=31+dec+${yearLabel};spanmin1=1+jan+${yearLabel};spanval1=span;template=results;type=batting`
       }
       if(type == 'test'){
        urlValue = `https://stats.espncricinfo.com/ci/engine/player/253802.html?class=1;filter=advanced;orderby=default;spanmax1=31+dec+${yearLabel};spanmin1=1+jan+${yearLabel};spanval1=span;template=results;type=batting`
       }
       if(type == 'allFormat'){
        urlValue = `https://stats.espncricinfo.com/ci/engine/player/253802.html?class=11;filter=advanced;orderby=default;spanmax1=31+dec+${yearLabel};spanmin1=1+jan+${yearLabel};spanval1=span;template=results;type=batting`
       }

        // Set the inner HTML of the fieldset
        fieldSet.innerHTML = `
            <legend>Year: ${yearLabel}</legend>
            <label><input type="checkbox" class="fill-min" name="fill" onchange="fillMin()">Not Applicable</label><br>
            <div class="iframe-section margins">
                <input type="text" class="url-input" value="${urlValue}">
                <button type="button" class="search-btn" onclick="scrapYear(2, '${yearId}${yearLabel}')">Search</button>
            </div>
            <label for="matches" class="margins">Matches: </label>
            <input type="number" class="margins" id="matches" required min="0" max="1000" pattern="^(0|[1-9][0-9]{0,2}|1000)$" name="${yearId}_${yearLabel}_matches">
            <br>
            <label for="innings" class="margins">Innings: </label>
            <input type="number" class="margins" id="innings" required min="0" max="1000" pattern="^(0|[1-9][0-9]{0,2}|1000)$" name="${yearId}_${yearLabel}_innings">
            <br>
            <label for="runs" class="margins">Runs: </label>
            <input type="number" class="margins" id="runs" required min="0" max="35000" pattern="^(0|[1-9][0-9]{0,4}|[1-2][0-9]{4}|3[0-4][0-9]{3}|35(0{1,3}|[0-9]{1,3}))$" name="${yearId}_${yearLabel}_runs">
            <br>
            <label for="average" class="margins">Average: </label>
            <input type="number" class="margins" id="average" min="0" required pattern="^(0|[1-9][0-9]{0,2}|[1-9][0-9]{0,2}(\.[0-9]{1,2})?|1000(\.0{1,2})?)$" name="${yearId}_${yearLabel}_average">
            <br>
            <label for="strikeRate" class="margins">Strike Rate: </label>
            <input type="number" class="margins" id="strikeRate" required pattern="^(0|[1-9][0-9]{0,2}|[1-4][0-9]{2}|500(\.0{1,2})?)$" name="${yearId}_${yearLabel}_strikeRate">
            <br>
            <label for="fifties" class="margins">50s: </label>
            <input type="number" class="margins" id="fifties" min="0" required pattern="^(0|[1-9][0-9]{0,2}|[1-4][0-9]{2}|500(\.0{1,2})?)$" name="${yearId}_${yearLabel}_fifties">
            <br>
            <label for="hundreds" class="margins">100s: </label>
            <input type="number" class="margins" id="hundreds" min="0" required pattern="^(0|[1-9][0-9]{0,2}|[1-4][0-9]{2}|500(\.0{1,2})?)$" name="${yearId}_${yearLabel}_hundreds">
            <br>
        `;

        // Append the fieldset to the fields container
        fieldsContainer.appendChild(fieldSet);
    }
}


 // Scrapes data from a specific table row and populates relevant inputs.

async function scrap(rowNo, sectionId) {
    scrapEngineTable(sectionId);
    const section = document.getElementById(sectionId);
    const url = section.querySelector('.url-input').value;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const tableContainer = document.getElementById('table-container');

    tableContainer.innerHTML = '<p>Data is loading...</p>'; // Loading message

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const html = data.contents;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const tables = doc.querySelectorAll('table.engineTable');

        let careerAveragesTable = Array.from(tables).find((table) =>
            table.querySelector('caption')?.innerText.trim() === 'Career averages'
        );

        if (careerAveragesTable) {
            const rows = careerAveragesTable.querySelectorAll('tr');
            const filteredRow = rows[rowNo];

            if (filteredRow) {
                const columns = filteredRow.querySelectorAll('td');
                const populateField = (selector, value) => {
                    try {
                        section.querySelector(selector).value = value;
                    } catch (error) {
                    }
                };

                populateField('#debut', columns[1]?.innerText.trim().split('-')[0]);
                populateField('#last-played', columns[1]?.innerText.trim().split('-')[1]);
                populateField('#matches', columns[2]?.innerText.trim());
                populateField('#innings', columns[3]?.innerText.trim());
                populateField('#runs', columns[5]?.innerText.trim());
                populateField('#average', columns[7]?.innerText.trim());
                populateField('#strikeRate', columns[9]?.innerText.trim());
                populateField('#fifties', columns[11]?.innerText.trim());
                populateField('#hundreds', columns[10]?.innerText.trim());

                careerAveragesTable = renderTable(careerAveragesTable);
                tableContainer.innerHTML = careerAveragesTable.outerHTML;
            } else {
                tableContainer.innerHTML = '<p>Filtered row not found!</p>';
            }
        } else {
            tableContainer.innerHTML = '<p>Career Averages Table not found!</p>';
        }
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        tableContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}


async function scrapYear(rowNo, sectionId) {
    scrapEngineTable(sectionId);
    const section = document.getElementById(sectionId);
    const url = section.querySelector('.url-input').value;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const tableContainer = document.getElementById('table-container');

    tableContainer.innerHTML = '<p>Data is loading...</p>'; // Loading message

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const html = data.contents;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const tables = doc.querySelectorAll('table.engineTable');

        let careerAveragesTable = Array.from(tables).find((table) =>
            table.querySelector('caption')?.innerText.trim() === 'Career averages'
        );

        if (careerAveragesTable) {
            const rows = careerAveragesTable.querySelectorAll('tr');
            const filteredRow = rows[rowNo];

            if (filteredRow) {
                const columns = filteredRow.querySelectorAll('td');
                const populateField = (selector, value) => {
                    try {
                        section.querySelector(selector).value = value;
                    } catch (error) {
                    }
                };

                populateField('#debut', columns[1]?.innerText.trim().split('-')[0]);
                populateField('#last-played', columns[1]?.innerText.trim().split('-')[1]);
                populateField('#matches', columns[1]?.innerText.trim());
                populateField('#innings', columns[2]?.innerText.trim());
                populateField('#runs', columns[4]?.innerText.trim());
                populateField('#average', columns[6]?.innerText.trim());
                populateField('#strikeRate', columns[8]?.innerText.trim());
                populateField('#fifties', columns[10]?.innerText.trim());
                populateField('#hundreds', columns[9]?.innerText.trim());

                careerAveragesTable = renderTable(careerAveragesTable);
                tableContainer.innerHTML = careerAveragesTable.outerHTML;
            } else {
                tableContainer.innerHTML = '<p>Filtered row not found!</p>';
            }
        } else {
            tableContainer.innerHTML = '<p>Career Averages Table not found!</p>';
        }
    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        tableContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}


/// filter table 
// ---------------------------- Fetch and Display Engine Table ---------------------------- //

/**
 * Fetches and displays the additional engine table alongside the Career Averages table.
 */
async function scrapEngineTable(sectionId) {
    const section = document.getElementById(sectionId);
    const url = section.querySelector('.url-input').value;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const tableContainer = document.getElementById('table-container2');

    tableContainer.innerHTML = '<p>Data is loading...</p>'; // Loading message

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const html = data.contents;
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const tables = doc.querySelectorAll('table.engineTable');

        // Find the table based on specific text contents (e.g., "Records type", "View", "Ordered by")
        const engineTable = Array.from(tables).find((table) => {
            const rows = table.querySelectorAll('tr');
            return Array.from(rows).some((row) => {
                const cellText = row.textContent.trim();
                return cellText.includes('Records type') || cellText.includes('View') || cellText.includes('Ordered by');
            });
        });

        if (engineTable) {
            const tableHtml = engineTable.outerHTML;
            tableContainer.innerHTML = tableHtml; // Display the fetched table
        } else {
            tableContainer.innerHTML = '<p>Engine Table not found!</p>';
        }
    } catch (error) {
        console.error('Error fetching or parsing Engine Table HTML:', error);
        tableContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
