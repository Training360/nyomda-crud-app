import { getAll } from './api.js';
import generateTable from './datatable.js';

const userTableHeadTitles = {
  id: 'Azonosító',
  firstName: 'Keresztnév',
  lastName: 'Vezetéknév',
};

const showUsers = async () => {
  const dataArray = await getAll('users');
  document.querySelector('#app').innerHTML = generateTable(dataArray, userTableHeadTitles, 'users');
};

export default showUsers;

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
