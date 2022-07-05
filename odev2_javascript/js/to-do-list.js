//Dom Elementlerini seçiyoruz
let inputDOM = document.querySelector("#task"); // girilen input kısmı
let submitDOM = document.querySelector("#liveToastBtn"); // ekle butonu kısmı
let listDOM = document.querySelector("#list"); // girilen inputların tutulduğu liste kısmı
let listdivDOM = document.querySelector(".list"); // listeyi içine alan div kısmı
let clearTodo = document.querySelector(".btn-danger"); // toDo listi temizle butonunun kısmı

//Tüm event listenersleri çalıştıran fonksiyon
eventListeners();

function eventListeners() {
  //Tüm Event Listenerler Burada
  submitDOM.addEventListener("click", addTodo); // ekleye basınca addToDo fonk çalışacak
  listDOM.addEventListener("click", deleteToDoFromUI); // çarpı ikonuna basılınca deleteToDoFromUI çalışacak
  listdivDOM.addEventListener("click", okTodo); // liste elemanının üstüne basılınca okTodo çalışacak
  document.addEventListener("DOMContentLoaded", loadAllToDoToUI);
  document.addEventListener("DOMContentLoaded", clearAllToDoButtonDisplayFeature);
  clearTodo.addEventListener("click", clearAllTodo); // hepsini temizle butonuna basınca clearAllTodo çalışacak ve hepsi temizlenecek
}


function clearAllToDoButtonDisplayFeature(e) { // hepsini temizle butonunun görünürlük özelliğinin fonksiyonu
  
  if (listDOM.firstElementChild === null) { // liste boş ise
    clearTodo.style.display = "none"; // buton görünmez
  } else { // liste boş değil ise
    clearTodo.style.display = "block"; // buton gözükür
  }

  e.preventDefault(); // Sayfa yenilenmesini engelleyen fonksiyon
}


function clearAllTodo(e) { // hepsini temizle butonuna basınca çalışacak fonksiyon ve hepsini silecek

  if (confirm("Tümünü Silmek İstediğinizden Emin Misiniz ?")) {
    while (listDOM.firstElementChild != null) { // eleman kalmayıncaya kadar 
      listDOM.removeChild(listDOM.firstElementChild); // ilk elemanı sile sile gider
    }

    localStorage.removeItem("todos"); // ayrıca local strogedaki adı olan todos listesini de oradan sileriz
  }

  clearAllToDoButtonDisplayFeature(e); // Tüm todoları silme butonunu güncelliyoruz
}

function okTodo(e) { // liste elemanının üstünebasıldığında çizecek ve okeyleyecek fonksiyon
  if (e.target.className === "listItem") { // eğer HTML tarafındaki kısımda eleman okeylenmemişse ve boştaysa  
    e.target.className = "checked"; // okeyle ve çiz

  } else if (e.target.className === "checked") { // eğer HTML tarafındaki kısımda zaten okeyli ve üstü çiziliyse 
    e.target.className = "listItem"; // yeniden boşa çıkar
  }
}

//deleteToDoFromUI function
function deleteToDoFromUI(e) {
  //silme iconuna tıklanıp tıklanmadığını kontrol ediyoruz
  if (e.target.className === "fa fa-remove close") { // eğer HTML tarafındaki kısımda olan çarpı ikon
    let a = e.target.parentElement.parentElement; // a burada liste elemanıdır
    deleteTodoFromStorage(a.innerText); // liste elemanı storage dan da silinir

    a.remove(); //veriyi siliyoruz
  }

  clearAllToDoButtonDisplayFeature(e); //Tüm todoları silme butonunu güncelliyoruz
}

function deleteTodoFromStorage(deletetodo) { // storagedan eleman silme fonksiyonu
  let todos = getTodoFromStorage(); // mevcut olarak bulunan arrayi alıyoruz
  
  todos.forEach(function (todo, index) { //bu aldığımız arrayi tek tek dolaşıyoruz foreach ile
    if (todo === deletetodo) { //silmek istenilen değeri arrayda yakalıyoruz
      todos.splice(index, 1); // o indexi siler
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos)); // güncel arrayin elemanlarını stringify edip yolluyoruz
}

function loadAllToDoToUI() {  // storagedan array alma ve ekrana yazdırma
  let todos = getTodoFromStorage(); // storagedan arrayi aldık
  todos.forEach((todo) => {
    addTodoTOUI(todo); // bu fonka gönderip yazdırıcaz
  });
}

function addTodo(e) { // yeni gelen inputları alma ve listeye ekleme
  const newTodo = inputDOM.value.trim(); //inputun başındaki ve sonundaki boşlukları kaldırma fonksiyonu boşluksuz hali kaldı
  if (newTodo === "") { // input boşsa
    $(".error").toast("show"); // hata toastu verir
    inputDOM.value = ""; // input kutucuğu sıfırlanır
  } else { // input boş değilse
    addTodoTOUI(newTodo); //Todoları Ara Yüze Ekliyoruz
    addTodoTOStorage(newTodo); //Todoları Storageye ekliyoruz
    $(".success").toast("show"); //Başarılı Bildirimi
  }
  clearAllToDoButtonDisplayFeature(e); //Tüm todoları silme butonunu güncelliyoruz
  e.preventDefault(); //işlemden sonra sayfa yenilenmeden işleme devam edebilmek için kullanıyoruz bu fonksiyonu
}


function getTodoFromStorage() { // arrayi storagedan alma fonksiyonu
  let todos; //todos isimli değişken oluştur

  if (localStorage.getItem("todos") === null) { // todos adlı bir array yoksa
    
    todos = []; //todos isimli array oluştur

  } else { // halihazırda varsa

    todos = JSON.parse(localStorage.getItem("todos")); // JSON.parse ile storageden arrayi çek
  }
  return todos;
}

function addTodoTOStorage(newTodo) { //yeni inputları al ve storage a yolla

  let todos = getTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos)); // yeni input eklenmiş arrayi storage a yolla
}

function addTodoTOUI(newTodo) { // yeni girilen inputları sayfada listeleme fonksiyonu

  const listItem = document.createElement("li"); // yeni eleman oluştur

  listItem.className = "listItem"; // liste elemanına listItem classı ver

  //silme işlemi için gerekli çarpı ikonunun özellikleri
  const link = document.createElement("a"); // ikon oluşturma kısmı
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove close'></i>";

  //list iteme yeni bir text ekliyoruz
  listItem.appendChild(document.createTextNode(newTodo));

  //list iteme yukarıda oluşturduğumuz iconu ekliyoruz
  listItem.appendChild(link);

  //list itemi listeye ekliyoruz
  listDOM.appendChild(listItem);

  //ekleme işleminden sonra inputu temizliyoruz
  inputDOM.value = "";
}