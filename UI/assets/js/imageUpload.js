const api = 'https://banka-andela-43.herokuapp.com';
const aviToken = sessionStorage.getItem('token');
const aviEmail = sessionStorage.getItem('email');
const avi = document.querySelector('.avatar');
const avicon = document.querySelector('.pishicon');


const updateAvatar = () => {
  const upload = document.querySelector('.uploadInput').files[0];

  if (upload) {
    const init = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': aviToken,
      },
      body: avicon.src,
    };
    const reader = new FileReader();
    reader.onload = () => {
      fetch(`${api}/api/v1/user/${aviEmail}/avatar`, init)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

      avi.src = reader.result;
      avicon.src = reader.result;
    };
    reader.readAsDataURL(upload);
  }
};

updateAvatar();
