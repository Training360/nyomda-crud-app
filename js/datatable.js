import { removeById } from './api.js';

let dataArray = [];
let headTitles;
let tableFor;
let isEditInProgress = false;

// const state = {
//   dataArray: [],
//   headTitles: null,
//   tableFor: null,
//   isEditInProgress: false,
// };

const generateTableHeadCellsForObjectProps = () => Object.keys(dataArray[0]).map((prop) => `
  <th class="table__th">
    ${headTitles[prop]}
  </th>`)
  .join('');

const generateTableHeadRow = () => `
  <tr class="table__row">
    ${generateTableHeadCellsForObjectProps()}
    <th>&nbsp;</th>
  </tr>
`;

const toggleButtonVisibility = (dataSelector) => {
  const buttons = document.querySelectorAll(`.btn${dataSelector}`);
  buttons.forEach((button) => {
    button.classList.toggle('d-none');
  });
};

const toggleInputReadonly = (dataSelector) => {
  document.querySelectorAll(`tr${dataSelector} input`).forEach((input) => {
    if (input.readOnly) {
      input.removeAttribute('readonly');
    } else {
      input.setAttribute('readonly', 'readonly');
    }
  });
};

const getItemIdFromEvent = (event) => event.target.dataset[`${tableFor}id`];

const getDataSelector = (event) => {
  const itemid = getItemIdFromEvent(event);
  return `[data-${tableFor}id="${itemid}"]`;
};

window.handleEditClick = (event) => {
  if (!isEditInProgress) {
    isEditInProgress = true;
    const dataSelector = getDataSelector(event);
    toggleButtonVisibility(dataSelector);
    toggleInputReadonly(dataSelector);
  }
};

window.handleDeleteClick = async (event) => {
  const itemid = getItemIdFromEvent(event);
  const dataSelector = getDataSelector(event);
  const response = await removeById(tableFor, itemid);
  if (!response.error) {
    document
      .querySelector(`tr${dataSelector}`)
      .remove();
  }
};

// window.handleUndoCLick = (event) => {
//   const itemid = event.target.dataset[`${tableFor}id`];
//   const dataSelector = `[data-${tableFor}id="${itemid}"]`;
//   document.querySelectorAll(`tr${dataSelector} input`).forEach((input) => {
//     input.value = input.getAttribute('value');
//   });
// };

const generateButtons = (id) => `
  <button data-${tableFor}id="${id}" onclick="handleEditClick(event)" class="btn btn--edit">Szereksztés</button>
  <button data-${tableFor}id="${id}" onclick="handleDeleteClick(event)" class="btn btn--delete">Törlés</button>
  <button data-${tableFor}id="${id}" class="btn btn--save d-none">Mentés</button>
  <button data-${tableFor}id="${id}" onclick="handleUndoCLick(event)" class="btn btn--undo d-none">Visszavonás</button>
`;

const getTableCellContent = (key, value) => {
  if (key === 'id') { return value; }
  return `<input type="text" name="${key}" value="${value}" readonly   />`;
};

const gerenrateTableBodyCellsForObjectProps = (data) => Object.entries(data).map(([key, value]) => `
  <td class="table__td">
    ${getTableCellContent(key, value)}
  </td>`).join('');

const generateTableBodyRow = () => dataArray.map((data) => `
  <tr class="table__row" data-${tableFor}id="${data.id}">
    ${gerenrateTableBodyCellsForObjectProps(data)}
    <td class="table__td">${generateButtons(data.id)}</td>
  </tr>
`).join('');

const generateTableHead = () => `     
  <thead class="table__head">
    ${generateTableHeadRow()}
  </thead>`;

const generateTableBody = () => ` 
  <tbody class="table__body">
    ${generateTableBodyRow()}
  </tbody>`;

const generateTable = (arayOfObjects, titles, path) => {
  dataArray = arayOfObjects;
  headTitles = titles;
  tableFor = path;
  return `<table class="table">
       ${generateTableHead()}
       ${generateTableBody()}
    </table>`;
};

export default generateTable;
