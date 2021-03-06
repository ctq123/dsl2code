/*
 * @Author: chengtianqing
 * @Date: 2021-06-12 01:50:35
 * @LastEditTime: 2021-07-04 01:05:57
 * @LastEditors: chengtianqing
 */

/**
 * 设置选择框
 * @param {*} page
 * @param {*} ele 父节点
 * @param {*} classPath 路径
 * @param {*} val 值
 * @param {*} index 第几个下拉框
 */
async function setSelect(page, ele, classPath, val, index = 1) {
  let el = null,
    els = null;
  els2 = null;
  await (ele || page).focus(`${classPath} input`);
  el = await (ele || page).$(`${classPath} .ant-select-clear`);
  el && (await el.click());

  el = await (ele || page).$(`${classPath} .ant-select-selection-search`);
  el && (await el.click());

  await page.waitForSelector(
    `body > div[style="position: absolute; top: 0px; left: 0px; width: 100%;"] .ant-select-dropdown`,
    { timeout: 10000 },
  );

  els = await page.$$(
    `body > div[style="position: absolute; top: 0px; left: 0px; width: 100%;"]`,
  );
  // el = await page.evaluate((els, index) => {
  //   return els[index - 1];
  // }, els, index);
  el = await els[index - 1];

  els2 = await el.$$('.rc-virtual-list > div > div > div .ant-select-item');
  // 查找对应的内容
  const texts = await el.$$eval(
    '.rc-virtual-list > div > div > div .ant-select-item > div',
    (node) => node.map((n) => n.innerText),
  );
  const i = texts.findIndex((k) => k === val);

  await page.waitForTimeout(300);
  await els2[i].click();
}

/**
 * 设置input
 * @param {*} page
 * @param {*} ele 父节点
 * @param {*} classPath 路径
 * @param {*} val 值
 */
async function setInput(page, ele, classPath, val = '') {
  const input = await (ele || page).$(`${classPath} input`);
  if (input) {
    let suf = null,
      icon = null;
    suf = await (ele || page).$(`${classPath} .ant-input-suffix`);
    suf && (await suf.click());
    icon = await (ele || page).$(
      `${classPath} > .ant-input-suffix > .ant-input-clear-icon-hidden`,
    );
    // await page.waitForSelector(`${classPath} > .ant-input-suffix > .ant-input-clear-icon-hidden`)
    await input.focus();
    await input.type(val);
  }
}

/**
 * 点击按钮
 * @param {*} page
 * @param {*} ele 父节点
 * @param {*} classPath 路径
 * @param {*} btnText 按钮文字
 */
async function clickButton(page, ele, classPath, btnText) {
  const texts = await (ele || page).$$eval(
    `${classPath} button > span`,
    (node) => node.map((n) => n.innerText.replace(/\s/g, '')),
  );
  const index = texts.findIndex((k) => k === btnText);

  const els = await (ele || page).$$(`${classPath} button`);
  await els[index].click();
}

/**
 * 根据文本查询节点
 * @param {*} page
 * @param {*} ele
 * @param {*} classPath
 * @param {*} text
 * @returns
 */
async function findEle(page, ele, classPath, text) {
  const texts = await (ele || page).$$eval(`${classPath}`, (node) =>
    node.map((n) => n.innerText.replace(/\s/g, '')),
  );
  const index = texts.findIndex((k) => k === text);
  // console.log("texts", texts, index)
  const els = await (ele || page).$$(`${classPath}`);
  return els[index] || null;
}

/**
 * 点击节点
 * @param {*} page
 * @param {*} ele 父节点
 * @param {*} classPath 路径
 */
async function clickDom(page, ele, classPath, text = '') {
  let el = null;
  if (text) {
    el = await findEle(page, ele, classPath, text);
  } else {
    el = await (ele || page).$(`${classPath}`);
  }
  await el.click();
}

/**
 * 点击节点
 * @param {*} page
 * @param {*} ele 父节点
 * @param {*} classPath 路径
 */
async function clickAllDom(page, ele, classPath) {
  const els = await (ele || page).$$(`${classPath}`);
  // console.log("classPath", els.length)
  for (let i = 0; i < els.length; i++) {
    await page.evaluate(async (el) => {
      await el.click();
    }, els[i]);
    // await els[i].click();
    await page.waitForTimeout(50);
  }
}

module.exports = {
  clickButton,
  setInput,
  setSelect,
  clickDom,
  clickAllDom,
  findEle,
};
