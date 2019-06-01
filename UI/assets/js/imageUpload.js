const updateAvatar = () => {
  const upload = document.querySelector('.uploadInput').files[0];

  if (upload) {
    const avatar = document.querySelector('.avatar');
    const pishicon = document.querySelector('.pishicon');
    const reader = new FileReader();
    reader.onload = () => {
      avatar.src = reader.result;
      pishicon.src = reader.result;
    };
    reader.readAsDataURL(upload);
  }
};

updateAvatar();
