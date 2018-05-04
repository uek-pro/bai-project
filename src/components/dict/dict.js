const generateDictList = (dict) => {

   let dictContent = '';
   for (let i = 0; i < dict.length; i++) {
       const row = dict[i];
       dictContent += `<p>${i+1}. ${row[0]} - ${row[1]}</p>`;
   }
   return dictContent;
};

export { generateDictList };