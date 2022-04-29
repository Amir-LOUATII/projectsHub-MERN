const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary");
const puppeteer = require("puppeteer");
const urlScreenShot = async (url, name) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: `../tmp/${name}.png` });

  await browser.close();
  const image = await cloudinary.uploader.upload(`../tmp/${name}.png`, {
    use_filename: true,
    folder: "projectshub",
  });
  fs.unlink(`../tmp/${name}.png`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return image.secure_url;
};
module.exports = urlScreenShot;
