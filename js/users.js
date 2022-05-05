import { getAll } from './api.js';

const tableHeadTitles = {
  id: 'Azonosító',
  firstName: 'Keresztnév',
  lastName: 'Vezetéknév',
};

const generateTableHeadCellsForObjectProps = (dataArray) => Object.keys(dataArray).map((prop) => `
  <th class="table__th">
    ${tableHeadTitles[prop]}
  </th>`)
  .join('');

const generateTableHeadRow = (dataArray) => `
  <tr class="table__row">
      ${generateTableHeadCellsForObjectProps(dataArray)}
      <th>&nbsp;</th>
  </tr>
`;

const generateButtons = (id) => `
  <button data-itemid="${id}" class="btn btn--edit">Szereksztés</button>
  <button data-itemid="${id}" class="btn btn--delete">Törlés</button>
  <button data-itemid="${id}" class="btn btn--save">Mentés</button>
  <button data-itemid="${id}" class="btn btn--undo">Visszavonás</button>
`;

const gerenrateTableBodyCellsForObjectProps = (dataArray) => Object.values(dataArray).map((prop) => `
  <td class="table__td">
    ${prop}
  </td>`).join('');

const generateTableBodyRow = (dataArray) => dataArray.map((data) => `
    <tr class="table__row">
      ${gerenrateTableBodyCellsForObjectProps(data)}
      <td class="table__td">${generateButtons(data.id)}</td>
    </tr>
  `).join('');

const generateTableHead = (dataArray) => `     
    <thead class="table__head">
      ${generateTableHeadRow(dataArray)}
    </thead>`;

const generateTableBody = (dataArray) => ` 
  <tbody class="table__body" >
    ${generateTableBodyRow(dataArray)}
  </tbody>`;

const generateTable = (dataArray) => `
    <table class="table">
       ${generateTableHead(dataArray[0])}
       ${generateTableBody(dataArray)}
    </table>`;

export default async () => {
  const dataArray = await getAll('users');
  document.querySelector('#app').innerHTML = generateTable(dataArray);
};

// export const showDatatableAll = async () => {
//   const dataArray = await getAll('users');
//   document.querySelector('#app').innerHTML = `
//     <table class="table">
//       <thead class="table__head">
//         <tr>
//           <th class="table__th">Azonosító</th>
//           <th class="table__th">Vezetéknév</th>
//           <th class="table__th">Keresztnév</th>
//           <th class="table__th">&nbsp;</th>
//        </tr>
//       </thead>
//       <tbody class="table__body">
//         ${dataArray.map((data) => `
//           <tr class="table__row">
//             <td class="table__td">${data.id}</td>
//             <td class="table__td">${data.lastName}</td>
//             <td class="table__td">${data.firstName}</td>
//             <td class="table__td">
//               <button data-itemid="${data.id}" class="btn btn--edit">Szereksztés</button>
//               <button data-itemid="${data.id}" class="btn btn--delete">Törlés</button>
//               <button data-itemid="${data.id}" class="btn btn--save">Mentés</button>
//               <button data-itemid="${data.id}" class="btn btn--undo">Visszavonás</button>
//             </td>
//           </tr>`).join('')}
//       </tbody>
//     </table>`;
// };
