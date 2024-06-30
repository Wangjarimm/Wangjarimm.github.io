const getToken = localStorage.getItem("token");


// Ambil elemen formulir
const form = document.getElementById("contact-form");
const namalengkapInput = document.getElementById("nama_lengkap");
const nikInput = document.getElementById("nik");
const jeniskelaminInput = document.getElementById("jenis_kelamin");
const tempatlahirInput = document.getElementById("tempat_lahir");
const tanggallahirInput = document.getElementById("tanggal_lahir");
const alamatInput = document.getElementById("alamat");
const nohpInput = document.getElementById("no_hp");
const inputButton = document.querySelector(".btn-success");

inputButton.addEventListener("click", (event) => { 
  event.preventDefault(); // Prevent the default form submission

  const nama_lengkap = namalengkapInput.value;
  const nik = nikInput.value;
  const jenis_kelamin = jeniskelaminInput.value;
  const tempat_lahir = tempatlahirInput.value;
  const tanggal_lahir = tanggallahirInput.value;
  const alamat = alamatInput.value;
  const no_hp = nohpInput.value;

  const dataPasien = {
    nama_lengkap: nama_lengkap,
    nik: nik,
    jenis_kelamin: jenis_kelamin,
    tempat_lahir: tempat_lahir,
    tanggal_lahir: tanggal_lahir, // Format tanggal sesuai kebutuhan backend
    alamat: alamat,
    no_hp: no_hp,
  };


  console.log(dataPasien);
  fetch("https://130.162.195.228/mhs714220011/pasien", {
    method: "POST",
    body: JSON.stringify(dataPasien) ,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken || ""}`
    },
  })
  .then((response) => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text) }); // Get the error response text
    }
    return response.json();
  })
  .then((result) => {
    console.log("Sukses:", result);
    window.location.href = "index_pasien.html";
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat menambahkan data.");
  });
  
});
