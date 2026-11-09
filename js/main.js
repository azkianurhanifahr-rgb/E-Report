
// humburger
const hamburgerBtn = document.querySelector('.humburger-btn');
const navbar = document.querySelector('.navbar');

hamburgerBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
  console.log('Tombol diklik! Status navbar:', navbar.classList.contains('active'));
});

// ganti warna tulisan kategori

const select= document.getElementById("select-category");

if (select.value ==="") {
    select.style.color= "#858585";
}

select.addEventListener('change', function() {
    if (this.value ==="") {
        this.style.color= "#858585";
    } else {
        this.style.color= "#ffffff";
    }
});

// pencarian
const searchInput = document.getElementById("searchInput");
const reportList = document.getElementById("reportList");
const reportItems = document.querySelectorAll(".report-item");

searchInput.addEventListener("input", function() {
    const keyword = this.value.toLowerCase();
    let found = false;

    reportList.style.display = keyword ? "block" : "none";

    reportItems.forEach(function(item) {
        const text = item.textContent.toLowerCase();

        if (text.includes(keyword) && keyword !== "") {
            item.style.display = "block";
            found = true;
        } else {
            item.style.display = "none";
        }
    });
});