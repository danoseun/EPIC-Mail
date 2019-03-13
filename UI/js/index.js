const introductions = [
    "Welcome to EPIC Mail",
    "EPIC Mail is an application that helps people exchange information over the internet.",
    "All you need is an account, signup on the application and start sending those emails right away.",
    "EPIC Mail also helps you manage your mail records."
];

const loadIntroTexts = () => {
  introductions.forEach((intro, index, introArr) => {
    let appIntro = document.querySelector('.l-heading');
    // appIntro.style.direction = "ltr";
    // appIntro.style.fontSize = "large";
    // appIntro.style.fontStyle = "oblique";
    // appIntro.style.fontFamily = "sans-serif";
    // appIntro.style.marginRight = "30px";
    // appIntro.style.textAlign = "center";
    appIntro.innerHTML = introArr[index++ % introArr.length];
    setInterval(() => {
      appIntro.innerHTML = introArr[index++ % introArr.length];
    }, 8000);
  });
}
window.onload = loadIntroTexts();