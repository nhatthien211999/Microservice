const uri = 'http://nhatthien.gear.host/api/birds';
const page_load = () => {

    try {
       fetch(uri)
      .then((response) => response.json())
      .then(data => {
            renderBirdList(data);
        })
      .catch((error) => {
        console.error('Error:', error);
      });

    } catch (error) {
        console.log(error);
    }
    

}

const btnSearch_Click = () => {
    document.getElementById("success").innerHTML = "";
    document.getElementById("err").innerHTML = "";
    let keyword = document.getElementById("txtKeyword").value.trim();
    if (keyword.length > 0)
      search(keyword);
    else
    page_load();
}

const btnAdd_click = () => {
    const newBird = {
        code: document.getElementById("txtCode").value,
        name: document.getElementById("txtName").value,
        price: document.getElementById("txtPrice").value,
        information: document.getElementById("txtInfo").value,
        type: document.getElementById("txtType").value,
    };
    addNewBird(newBird);
}

const btnUpdate_click = () => {
    const newBird = {
        code: document.getElementById("txtCode").value,
        name: document.getElementById("txtName").value,
        price: document.getElementById("txtPrice").value,
        information: document.getElementById("txtInfo").value,
        type: document.getElementById("txtType").value,
    };

    updateBird(newBird);

}

const btnDelete_click = () => {
    let code = document.getElementById("txtCode").value;
    deleteBird(code);
}

function renderBirdList(birds) {
    console.log(birds);
    var rows = "";
    for (var bird of birds) {
      rows += "<tr>";
      rows += "<td><a href='#' onclick='lnkID_Click(" + bird.Code + ")'>" + bird.Code + "</a></td>";
      rows += "<td>" + bird.Name + "</td>";
      rows += "<td>" + bird.Price + "</td>";
      rows += "<td>" + bird.Information + "</td>";
      rows += "<td>" + bird.Type + "</td>";
      rows += "</tr>";
    }
    var header = "<tr><th>Code</th><th>Name</th><th>Price</th><th>Information</th><th>Type</th></tr>";
  
    document.getElementById("lists").innerHTML = header + rows;
  }

  function renderBirdDetails(bird) {
    document.getElementById("txtCode").value = bird.Code;
    document.getElementById("txtName").value = bird.Name;
    document.getElementById("txtPrice").value = bird.Price;
    document.getElementById("txtInfo").value = bird.Information;
    document.getElementById("txtType").value = bird.Type;
  }

function getDetails(code) {
    fetch(uri + '/' + code)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderBirdDetails(data);
    });
}

function lnkID_Click(code) {
    getDetails(code);
}

const addNewBird = (newBird) => {
    fetch(uri, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBird),
    })
    .then(response => {
        console.log(response);
        document.getElementById("err").innerHTML = "";
        document.getElementById("success").innerHTML = "<b>Thêm thành công</b>";
        page_load();
    })
    .catch(error => {
        console.log(error);
        document.getElementById("success").innerHTML = "";
        document.getElementById("message").innerHTML = "<b>Thêm thất bại</b>";
    })
}

const updateBird = (newBird) => {
    fetch(uri + "/" + newBird.Code, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBird),
    })
    .then(response => {
        console.log(response);
        document.getElementById("err").innerHTML = "";
        document.getElementById("success").innerHTML = "<b>Cập nhập thành công</b>";
        page_load();
    })
    .catch(error => {
        console.log(error);
        document.getElementById("success").innerHTML = "";
        document.getElementById("err").innerHTML = "<b>Cập nhập thất bại</b>";
    })
}

const deleteBird = (code) => {
    fetch(uri + "/" + code, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log(response);
        document.getElementById("err").innerHTML = "";
        document.getElementById("success").innerHTML = "<b>Xóa thành công</b>";
        page_load();
        resetForm();
    })
    .catch(error => {
        console.log(error);
        document.getElementById("success").innerHTML = "";
        document.getElementById("err").innerHTML = "<b>Xóa thất bại</b>";
    })
}

const search = (keyword) => {
    fetch(uri + "/search/" + keyword, {
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderBirdList(data);
    });
}

const resetForm = () => {
    document.getElementById("txtCode").value = "";
    document.getElementById("txtName").value = "";
    document.getElementById("txtPrice").value = "";
    document.getElementById("txtInfo").value = "";
    document.getElementById("txtType").value = "";
}