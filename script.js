const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const resultImage = document.getElementById("resultImage");
const form = document.querySelector("form");

form.addEventListener("submit", onFormSubmit);
form.addEventListener("reset", onFormReset);

function onFormReset() {
  bmiText.textContent = 0;
  bmiText.className = "";
  descText.textContent = "N/A";
  resultImage.style.display = "none";
}

function onFormSubmit(e) {
  e.preventDefault();

  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  const heightInMeters = height / 100; 
  const bmi = weight / Math.pow(heightInMeters, 2);
  const desc = interpretBMI(bmi);

  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = desc;
  descText.innerHTML = `You are <strong>${desc}</strong>`;

  
  resultImage.style.display = "block";
  resultImage.src = getImageSrc(desc);
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}

function getImageSrc(category) {
  switch (category) {
    case "underweight":
      return "https://img.freepik.com/free-vector/sad-girl-with-face-expression_1308-123903.jpg?w=2000";
    case "healthy":
      return "https://img.freepik.com/premium-vector/cartoon-happy-little-girl-jumping_29190-7487.jpg?w=2000";
    case "overweight":
      return "https://img.freepik.com/free-vector/overweight-woman-cartoon-character_1308-133649.jpg?size=626&ext=jpg&ga=GA1.1.1371518722.1698192000&semt=ais";
    case "obese":
      return "https://img.freepik.com/premium-vector/face-fat-boy-cartoon_1639-50701.jpg?w=2000";
    default:
      return "";
  }
}
