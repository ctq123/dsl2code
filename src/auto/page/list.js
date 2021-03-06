const get = require('lodash/get');
const base = require('../base.js');
const common = require('./common.js');

const generatePage = async ({ page, apiData }) => {
  let ele = null;

  // 处理搜索框的设置tab
  const searchChange = async () => {
    // 点击搜索组件
    await page.waitForSelector("#root div[class^='page-container'] form");
    await base.clickButton(
      page,
      null,
      "#root div[class^='page-container'] form",
      '重置',
    );
    await page.waitForSelector('#rc-tabs-0-panel-setting form div span input');

    ele = await page.$('#rc-tabs-0-panel-setting');
    // 先清空所有数据
    await base.clickAllDom(
      page,
      ele,
      'form > div > div > div > div > div div button span.anticon-delete',
    );
    await page.waitForTimeout(500);
    const form = get(apiData, 'search.form');
    let i = 1;
    let plusEl = await ele.$(
      `form > div > div > div > div button .anticon-plus`,
    );
    for (let k in form) {
      // await plusEl.click();// 诡异有时候不会触发
      await page.evaluate((el) => {
        return el.click();
      }, plusEl);
      await page.waitForSelector(
        `#dynamic_form_nest_item div:nth-child(${i}) input`,
        { timeout: 10000 },
      );
      await base.setInput(
        page,
        ele,
        `form div:nth-child(${i}) .ant-space:nth-child(1) .ant-space-item:nth-child(1)`,
        form[k].label,
      );
      await base.setInput(
        page,
        ele,
        `form div:nth-child(${i}) .ant-space:nth-child(1) .ant-space-item:nth-child(2)`,
        k,
      );
      console.log(i, k, form[k].label, form[k].enumObj);
      await base.setSelect(
        page,
        ele,
        `form div:nth-child(${i}) .ant-space:nth-child(2) .ant-space-item:nth-child(1)`,
        form[k].componentType,
        i,
      );
      if (['选择器', '单选框'].includes(form[k].componentType)) {
        await common.setOptionModal({ page, enumObj: form[k].enumObj });
      }
      i++;
    }

    // 提交
    await base.clickButton(page, ele, 'form div div div div', '提交');
    await page.waitForTimeout(1000);
  };

  // 处理表格顶部模块
  const operateChange = async () => {
    await page.waitForSelector(
      "#root div div div[class^='page-container'] div[class^='df'] button",
    );
    await base.clickDom(
      page,
      null,
      "#root div div div[class^='page-container'] div[class^='df'] button",
    );

    await page.waitForSelector('#rc-tabs-0-panel-setting form div span input');
    await page.waitForTimeout(500);
    ele = await page.$('#rc-tabs-0-panel-setting form');
    await base.setInput(page, ele, `div`, apiData.title);

    await base.clickButton(page, ele, 'div div div div', '提交');
    await page.waitForTimeout(1000);
  };

  // 处理表格列配置
  const tableChange = async () => {
    // 点击列表组件
    await page.waitForSelector("#root div[class^='page-container'] div table");
    await base.clickDom(
      page,
      null,
      "#root div[class^='page-container'] div table",
    );
    await page.waitForSelector('#rc-tabs-0-panel-setting form div span input');
    await page.waitForTimeout(1000);

    // 先清空所有数据
    ele = await page.$('#rc-tabs-0-panel-setting');
    // 先清空所有数据
    await base.clickAllDom(
      page,
      ele,
      'form div div button span.anticon-delete',
    );
    await page.waitForTimeout(500);
    let columnsObj = get(apiData, 'columnsObj');
    columnsObj = Object.assign(columnsObj, {
      '-': {
        label: '操作',
        componentType: '操作',
      },
    });
    let i = 1;
    let plusEl = await ele.$(
      `form > div > div > div > div button .anticon-plus`,
    );
    for (let k in columnsObj) {
      // await plusEl.click();// 诡异有时候不会触发
      await page.evaluate((el) => {
        return el.click();
      }, plusEl);
      await page.waitForSelector(
        `#dynamic_form_nest_item div:nth-child(${i}) input`,
        { timeout: 10000 },
      );
      await base.setInput(
        page,
        ele,
        `form div:nth-child(${i}) .ant-space:nth-child(1) .ant-space-item:nth-child(1)`,
        columnsObj[k].label,
      );
      await base.setInput(
        page,
        ele,
        `form div:nth-child(${i}) .ant-space:nth-child(1) .ant-space-item:nth-child(2)`,
        k,
      );
      console.log(i, k, columnsObj[k].label, columnsObj[k].enumObj);
      await base.setSelect(
        page,
        ele,
        `form div:nth-child(${i}) .ant-space:nth-child(2) .ant-space-item:nth-child(1)`,
        columnsObj[k].componentType,
        i,
      );
      if (['状态'].includes(columnsObj[k].componentType)) {
        await common.setOptionModal({ page, enumObj: columnsObj[k].enumObj });
      }
      i++;
    }

    // 提交
    await base.clickButton(page, ele, 'div div div div', '提交');
    await page.waitForTimeout(1000);
  };

  // 处理
  await common.tmplChange({ page, text: '管理列表' });
  await common.apiChange({ page, apiData });
  await searchChange();
  await operateChange();
  await tableChange();
  await common.generateCode({ page });
};

module.exports = {
  generatePage,
};
