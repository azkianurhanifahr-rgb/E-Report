// menentukan nama tempat data disimpan di local storage
const KUNCI_STORAGE = 'E_REPORT_DATA';
// 1. variabel global untuk menyimpan data laporan
let daftarLaporan = [];

// fungsi muat data itu dieksekusi ketika halaman html selesai dimuat
document.addEventListener('DOMContentLoaded', muatData());

// 2. READ => mengambil data dari data.js
function muatData() {
    daftarLaporan = typeof dataAwalLaporan !== 'undefined' ? [...dataAwalLaporan] : [];
    // console.log(daftarLaporan);
    tampilkanDataTabel();
}

// menampilkan data kehalaman web
function tampilkanDataTabel() {
    const tabelBody = document.getElementById('reports-table-body');

    // memastikan tabel body kosong
    tabelBody.innerHTML = '';

    // menampilkan baris data
    daftarLaporan.forEach((laporan) => {
        tabelBody.appendChild(buatBarisLaporan(laporan));
    });
}

// membuat satu baris <tr> untuk satu laporan
function buatBarisLaporan(laporan) {
    // membuat tr baru
    const baris = document.createElement('tr');

    baris.innerHTML = `
    <td>
        <div class="pelapor-name">${laporan.pelapor}</div>
    </td>

    <td>${laporan.kategori}</td>

    <td>${laporan.deskripsi}</td>

    <td><span class="badge warning">${laporan.status}</span></td>

    <td>
        <div class="action-buttons">
            <button class="btn-action success">Selesai</button>
            <button class="btn-action danger">Hapus</button>
        </div>
    </td>

    `
    return baris;
}

// 3. CREAT => menambahkan data laporan baru dari form
function handleFormSubmit(event) {

    event.preventDefault(); //untuk mencegah halaman refresh
    // mengambil isi form
    const form = event.target
    const nama = form.reporter.value.trim();
    const kategori = form.category.value;
    const deskripsi = form.description.value.trim();

    // pengecekan value (validasi) => mengecek apakah semua input terisi
    if (!nama || !kategori || !deskripsi) {
        return console.log("Mohon lengkapi semua data!")
    }

    // membuat objek laporan baru
    const laporanBaru = {
        id: `rep-${Date.now()}`, //id unik berdasarkan waktu saat ini
        pelapor: nama,
        kategori: kategori,
        deskripsi: deskripsi,
        status: 'Menunggu'
    };

    // menambahkan laporan baru ke data lama
    daftarLaporan.unshift(laporanBaru);
    // menyimpan ke dalam local storage
    simpanData();
    tampilkanDataTabel();

    // mengosongkan form
    form.reset();

    // sweet alert
    Swal.fire("Berhasil tersimpan!");
}

// proses menyimpan data ke local storage
function simpanData() {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarLaporan))

}
