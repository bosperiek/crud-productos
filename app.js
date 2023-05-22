// Array para almacenar los productos
var products = [];

// Función para agregar un producto
function addProduct(nombre, descripcion) {
  var product = {
    nombre: nombre,
    descripcion: descripcion,
  };
  products.push(product);
  saveProducts();
}

// Función para guardar los productos en el almacenamiento local
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Función para cargar los productos desde el almacenamiento local
function loadProducts() {
  var savedProducts = localStorage.getItem("products");
  if (savedProducts) {
    products = JSON.parse(savedProducts);
  }
}

// Función para mostrar la lista de productos
function showProductList() {
  var productList = document.getElementById("product-list");
  productList.innerHTML = "";

  // Crear la tabla
  var table = document.createElement("table");
  table.classList.add("table");

  // Crear encabezado de la tabla
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");
  var headerName = document.createElement("th");
  headerName.textContent = "Nombre";
  var headerDescription = document.createElement("th");
  headerDescription.textContent = "Descripción";
  var headerActions = document.createElement("th");
  headerActions.textContent = "Acciones";

  headerRow.appendChild(headerName);
  headerRow.appendChild(headerDescription);
  headerRow.appendChild(headerActions);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Crear cuerpo de la tabla
  var tbody = document.createElement("tbody");

  products.forEach(function (product, index) {
    var row = document.createElement("tr");

    // Celda de nombre
    var nameCell = document.createElement("td");
    nameCell.textContent = product.nombre;

    // Celda de descripción
    var descriptionCell = document.createElement("td");
    descriptionCell.textContent = product.descripcion;

    // Celda de acciones
    var actionsCell = document.createElement("td");

    // Botón de editar
    var editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit-button"); // Agregar una clase al botón de editar
    editButton.addEventListener("click", function () {
      editProduct(index);
    });

    // Botón de eliminar
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-button"); // Agregar una clase al botón de eliminar
    deleteButton.addEventListener("click", function () {
      deleteProduct(index);
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(document.createTextNode(" "));
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(actionsCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  productList.appendChild(table);
}

// Función para editar un producto
function editProduct(index) {
  var newName = prompt("Ingrese el nuevo nombre del producto:");
  var newDescription = prompt("Ingrese la nueva descripción del producto:");

  if (newName && newDescription) {
    products[index].nombre = newName;
    products[index].descripcion = newDescription;
    saveProducts();
    showProductList();
  }
}

// Función para eliminar un producto
function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  showProductList();
}

// Manejador del formulario para agregar un producto
var addProductForm = document.getElementById("add-product-form");
addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var productNameInput = document.getElementById("product-name");
  var productDescriptionInput = document.getElementById("product-description");

  var productName = productNameInput.value;
  var productDescription = productDescriptionInput.value;

  if (productName && productDescription) {
    addProduct(productName, productDescription);
    productNameInput.value = "";
    productDescriptionInput.value = "";
    showProductList();
  }
});

// Cargar los productos almacenados al cargar la página
loadProducts();
showProductList();
