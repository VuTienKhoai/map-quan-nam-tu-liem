// Khởi tạo bản đồ tại vị trí của Nam Từ Liêm
var map = L.map("map").setView([21.0173512, 105.7613329], 13.2);

// Layer chuẩn OpenStreetMap
var osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

// Layer giao thông
var trafficLayer = L.tileLayer(
  "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors',
  }
);

// Layer xe đạp
var cycleLayer = L.tileLayer(
  "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors',
  }
);
// Chức năng định vị người dùng
var locateControl = L.control
  .locate({
    position: "topleft",
    strings: { title: "Tìm vị trí của tôi" },
    locateOptions: { maxZoom: 16 },
  })
  .addTo(map);
// Tọa độ quận Nam Từ Liêm
var namTuLiemCoordinates = [
  [21.057474408907748, 105.72904041201517], // Điểm 1
  [21.052323219387333, 105.72620596953286], // Điểm 2
  [21.050374074160704, 105.72829450609876], // Điểm 3
  [21.048146448366534, 105.72754860018237], // Điểm 4
  [21.017234702241534, 105.73008468029813], // Điểm 1 (đóng vùng)
  [20.99662331052829, 105.73575356526277], // Điểm 1 (đóng vùng)
  [20.978934239086787, 105.76245699706989], // Điểm 1 (đóng vùng)
  [20.98589869047662, 105.79423258910853], // Điểm 1 (đóng vùng)
  [20.9884058134938, 105.79826048105707], // Điểm 1 (đóng vùng)
  [21.013335468153002, 105.78945879124358], // Điểm 1 (đóng vùng)
  [21.029628019182173, 105.7839390874622], // Điểm 1 (đóng vùng)
  [21.03979255481632, 105.76782751966797], // Điểm 1 (đóng vùng)
  [21.038121719875186, 105.75320776370653], // Điểm 1 (đóng vùng)
  [21.0565677679864, 105.72959334240821], // Điểm 1 (đóng vùng)
];
// Vẽ polygon cho Nam Từ Liêm với nét đứt và chỉ có viền
var namTuLiemPolygon = L.polygon(namTuLiemCoordinates, {
  color: "blue", // Màu viền
  weight: 3, // Độ dày viền
  dashArray: "5,5", // Nét đứt (đặt chiều dài của nét đứt là 5px, khoảng trống là 5px)
  fillColor: "transparent", // Không có màu nền
  fillOpacity: 0, // Không có độ trong suốt cho nền
}).addTo(map);

// Thêm popup khi click
namTuLiemPolygon.bindPopup(
  "<b>Quận Nam Từ Liêm</b><br>Đây là khu vực được đánh dấu."
);

// Các layer bản đồ
var baseMaps = {
  "Bản đồ chuẩn": osmLayer,
  "Bản đồ giao thông": trafficLayer,
  "Bản đồ xe đạp": cycleLayer,
};

// Tạo layer group cho trường học
var schoolLayer = L.layerGroup();
var icon_school = L.icon({
  iconUrl: "image/icon_school.png",
  iconSize: [38, 40], // size of the icon
});
// Tải dữ liệu từ tệp schools.json
fetch("schools.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((schools) => {
    // Thêm marker cho mỗi trường học vào layer group
    schools.forEach((school) => {
      var marker = L.marker([school.lat, school.lng], {
        icon: icon_school,
      }).bindPopup(`<b>${school.name}</b><br>${school.description}`);
      schoolLayer.addLayer(marker); // Thêm marker vào group
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải dữ liệu schools:", error);
  });

// Thêm điều khiển layer vào bản đồ
// L.control
//   .layers(baseMaps, { "Trường học": schoolLayer }, { collapsed: false })
//   .addTo(map);

// Tạo layer group cho bệnh viện
var hospitalLayer = L.layerGroup();
var icon_hospital = L.icon({
  iconUrl: "image/icon_hospital.png",
  iconSize: [38, 40], // size of the icon
});
// Tải dữ liệu từ tệp schools.json
fetch("hospital.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((hospitals) => {
    // Thêm marker cho mỗi trường học vào layer group
    hospitals.forEach((hospital) => {
      var marker = L.marker([hospital.lat, hospital.lng], {
        icon: icon_hospital,
      }).bindPopup(`<b>${hospital.name}</b><br>${hospital.description}`);
      hospitalLayer.addLayer(marker); // Thêm marker vào group
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải dữ liệu schools:", error);
  });

// Tạo layer group cho trung tâm thương mại
var shoppingLayer = L.layerGroup();
var icon_shopping = L.icon({
  iconUrl: "image/image_shopping.png",
  iconSize: [38, 40], // size of the icon
});
// Tải dữ liệu từ tệp schools.json
fetch("shopping_mall.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((shops) => {
    // Thêm marker cho mỗi trường học vào layer group
    shops.forEach((shop) => {
      var marker = L.marker([shop.lat, shop.lng], {
        icon: icon_shopping,
      }).bindPopup(`<b>${shop.name}</b><br>${shop.description}`);
      shoppingLayer.addLayer(marker); // Thêm marker vào group
    });
  })
  .catch((error) => {
    console.error("Lỗi khi tải dữ liệu schools:", error);
  });
// Thêm điều khiển layer vào bản đồ
L.control
  .layers(
    baseMaps,
    {
      "Trường học": schoolLayer,
      "Bệnh viện": hospitalLayer, // Thêm trung tâm thương mại vào điều khiển layers
      "Trung tâm thương mại": shoppingLayer, // Thêm trung tâm thương mại vào điều khiển layers
    },
    { collapsed: false }
  )
  .addTo(map);
L.Control.geocoder().addTo(map); // Tạo control tìm kiếm sử dụng Geocoder
