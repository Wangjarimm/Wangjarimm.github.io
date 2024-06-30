const getToken = localStorage.getItem("token");
// console.log(getToken);

fetch("https://130.162.195.228/mhs714220011/dokter",
	{
		method: "GET",
		headers: {authorization: `Bearer ${getToken}` ||""}}
)

	.then((result) => {
		return result.json();
	})
	.then((data) => {
		let tableData = "";
		console.log(data);
		data.map((values) => {
			// Manipulasi data pegawai dan masukkan ke dalam bentuk tabel
			tableData += `
                <tr>
                <td>${values.nid}</td>
                <td>${values.nama}</td>
                <td>${values.keahlian}</td>
                <td>${values.no_hp}</td>
                <td>
                <button type="button" class="btn btn-success" dokter-id="${values.id}">Edit</button>
                <button type="button" class="btn btn-danger" dokter-id="${values.id}">Delete</button>
              </td>
                </tr>`;
		});
		// Tampilkan data pegawai ke dalam tabel
		document.getElementById("index_doktor-table").innerHTML = tableData;

		// Tambahkan event listener pada setiap tombol delete
		const deleteButtons = document.querySelectorAll('.btn-danger');
		deleteButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				const id = event.target.getAttribute('dokter-id');
				// Kirim permintaan DELETE ke server
				fetch(`https://130.162.195.228/mhs714220011/dokter/${id}`, {
					method: 'DELETE',
					headers: {authorization: `Bearer ${getToken}` ||""}
				})
					.then((response) => {
						if (response.ok) {
							// Sukses menghapus data, lakukan tindakan sesuai kebutuhan (misalnya, memperbarui tampilan tabel)
							// Contoh:
							event.target.parentNode.parentNode.remove(); // Menghapus baris tabel yang sesuai dengan tombol delete yang diklik
						} else {
							// Gagal menghapus data, berikan umpan balik kepada pengguna atau tangani kesalahan
							throw new Error('Gagal menghapus data');
						}
					})
					.catch(error => {
						console.log('error', error);
						alert('Terjadi kesalahan pada server');
					});
			});
		});

		// Tambahkan event listener pada setiap tombol detail
		const detailButtons = document.querySelectorAll('.btn-success');
		detailButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				const id = event.target.getAttribute('dokter-id');
				window.location.href = `update_doktor.html?id=${id}`;
			});
		});
	})
	.catch(error => {
		console.log('error', error);
		alert('Terjadi kesalahan pada server');
	});