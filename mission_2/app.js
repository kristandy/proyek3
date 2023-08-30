document.addEventListener("DOMContentLoaded", menuMakanan);

function menuMakanan() {
  const daftarMenu = document.getElementById("daftar-menu");
  const hargaTotal = document.getElementById("total-harga");
  const pajakHarga = document.getElementById("pajak-harga");
  const totalBayar = document.getElementById("total-beli-pajak");

  daftarMenu.addEventListener("click", cekMenu);

  function cekMenu(event) {
      const target = event.target;

      if (target.classList.contains("beli")) {
          const menuItem = target.parentElement;
          menuItem.classList.toggle("terpilih");
          
          // Ambil elemen input dan jumlah barang
          const inputElem = menuItem.querySelector(".jumlah");
          // const jumlahBarang = parseInt(inputElem.value);

          let total = 0;
          const menuTerpilih = daftarMenu.getElementsByClassName("terpilih");
          const cartItemsList = document.getElementById("cart-items");

          while (cartItemsList.firstChild) {
              cartItemsList.removeChild(cartItemsList.firstChild);
          }

          // Array.from(menuTerpilih).forEach(makanan);
          Array.from(menuTerpilih).forEach(menuItem => {
            const inputElem = menuItem.querySelector(".jumlah");
            const jumlahBarang = parseInt(inputElem.value);
            makanan(menuItem, jumlahBarang);
        });
        

          function makanan(item, jumlahBarang) {
              const namaMakanan = item.textContent;
              const harga = parseInt(item.getAttribute("harga"));
              total += harga * jumlahBarang; // Mengalikan harga dengan jumlah barang

              const cartItem = document.createElement("li");
              cartItem.textContent = `${namaMakanan} (${jumlahBarang})`; // Menampilkan jumlah barang di dalam keranjang
              cartItemsList.appendChild(cartItem);
          }

          const pajak = 0.11 * total;
          let totalPembayaran = total + pajak;

          hargaTotal.innerText = "Rp. " + total;
          pajakHarga.innerText = "Rp. " + pajak.toFixed(0);
          totalBayar.innerHTML = "Rp. " + totalPembayaran;
      } else if (target.classList.contains("increment")) {
          const inputElem = target.nextElementSibling;
          inputElem.value = parseInt(inputElem.value) + 1;
      } else if (target.classList.contains("decrement")) {
          const inputElem = target.previousElementSibling;
          if (parseInt(inputElem.value) > 0) {
              inputElem.value = parseInt(inputElem.value) - 1;
          }
      }
  }
}