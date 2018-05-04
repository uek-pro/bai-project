const generateDictList = (dict) => {

   let dictContent = '';
   for (let i = 0; i < dict.length; i++) {
       const row = dict[i];
       dictContent += `<p>${i+1}. ${row[0]} - ${row[1]}</p>`;
   }
   return dictContent;
};

const generateDictTable = (dict, element) => {

    for (let i = 0; i < dict.length; i++) {
        const row = dict[i];
        const content = (
            `<div class="db-dict-row">
                <div class="db-dict-left">${row[0]}</div>
                <div class="db-dict-right">${row[1]}</div>
            </div>`
        );
        $(element).append(content).trigger('create');
    }
};

const generateDictHTML = (dict) => {

    let html = '';
    for (let i = 0; i < dict.length; i++) {
        const row = dict[i];
        html += (
            `<div class="db-dict-row">
                <div class="db-dict-left">${row[0]}</div>
                <div class="db-dict-right">${row[1]}</div>
            </div>`
        );
    }
    return html;
};

export { generateDictList, generateDictTable, generateDictHTML }; 
