console.log('Hello from Renderer');
const itens: string[] = [];


const itemName = document.getElementById('itemName')  as HTMLInputElement;
const table =  document.getElementById("myTable") as HTMLTableElement;
const addButton = document.getElementById('addItem') as HTMLButtonElement;
const searchButton = document.getElementById('search') as HTMLButtonElement;
addButton?.addEventListener('click',()=>{  
  const row = table.insertRow(1);
  var name = row.insertCell(0);
  var qtd = row.insertCell(1);
  name.innerHTML = itemName.value;
  qtd.innerHTML = "1";
  itens.push(itemName.value);
  itemName.value ="";
  searchButton.style.display="block";
});

searchButton?.addEventListener('click',()=>{
  alert("procurar lista de itens");
  console.log(itens);
});
