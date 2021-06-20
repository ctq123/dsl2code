const DSL = {
  componentName: 'DIV',
  type: 'edit',
  props: {
    className: 'edit-container',
  },
  children: [
    {
      componentName: 'CrumbBack',
      props: {},
      dataKey: 'title',
      onClick: `function handleGoBack() {
        this.$router.go(-1);
      }`,
    },
    {
      componentName: 'DIV',
      props: {
        className: 'content-con bshadow',
      },
      children: [
        {
          componentName: 'DIV',
          props: {
            className: 'product-info-block common-block',
          },
          isEdit: true,
          children: [
            {
              componentName: 'DIV',
              props: {
                className: 'title',
              },
              children: '商品信息',
            },
            {
              componentName: 'Row',
              props: {
                gutter: 20,
              },
              children: [
                {
                  componentName: 'Col',
                  props: {
                    span: 8,
                  },
                  dataKey: 'form',
                  children: [
                    {
                      label: '出库单号',
                      key: 'SendNo',
                    },
                  ],
                },
                {
                  componentName: 'Col',
                  props: {
                    span: 8,
                  },
                  dataKey: 'form',
                  children: [
                    {
                      label: '发货人手机号',
                      key: 'phone',
                    },
                  ],
                },
                {
                  componentName: 'Col',
                  props: {
                    span: 8,
                    className: 'f1',
                  },
                  dataKey: 'form',
                  children: [
                    {
                      label: '退货地址',
                      key: 'SendAddress',
                      isEllipsis: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          componentName: 'DIV',
          props: {
            className: 'record-info-block common-block',
          },
          isEdit: true,
          children: [
            {
              componentName: 'DIV',
              props: {
                className: 'title',
              },
              children: '备案信息',
            },
            {
              componentName: 'Form',
              props: {
                'label-width': '130px',
              },
              dataKey: 'form',
              children: [
                {
                  label: '实际货号',
                  key: 'actualArticleNumber',
                  children: [
                    {
                      componentName: 'Input',
                      props: {
                        placeholder: '请输入实际货号',
                        clearable: true,
                      },
                    },
                  ],
                },
                {
                  label: '状态',
                  key: 'status',
                  children: [
                    {
                      componentName: 'Select',
                      props: {
                        placeholder: '请选择状态',
                        clearable: true,
                      },
                      options: [
                        { value: '0', label: '审批中' },
                        { value: '1', label: '已通过' },
                        { value: '2', label: '已驳回' },
                      ],
                    },
                  ],
                },
                {
                  label: '创建时间',
                  key: 'createTime',
                  children: [
                    {
                      componentName: 'RangePicker',
                      props: {},
                    },
                  ],
                },
                {
                  label: '商品英文名称',
                  key: 'productEnName',
                  children: [
                    {
                      componentName: 'Input',
                      props: {
                        placeholder: '请输入商品英文名称',
                        clearable: true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          componentName: 'DIV',
          props: {
            className: 'common-block',
          },
          isEdit: true,
          children: [
            {
              componentName: 'DIV',
              props: {
                className: 'title',
              },
              children: 'SKU列表',
            },
            {
              componentName: 'Table',
              props: {
                size: 'small',
                border: true,
              },
              type: 'editTable',
              dataKey: 'dataList',
              onSelectionChange: `function handleSelectionChange(rows) {
                this.multipleSelection = rows
              }`,
              children: [
                {
                  key: 'id',
                  label: '序号',
                },
                {
                  key: 'orderNo',
                  label: '订单号',
                  children: [
                    {
                      componentName: 'Input',
                      props: {
                        placeholder: '请输入',
                        clearable: true,
                      },
                    },
                  ],
                },
                {
                  key: 'trueName',
                  label: '姓名',
                  children: [
                    {
                      componentName: 'Input',
                      props: {
                        placeholder: '请输入',
                        clearable: true,
                      },
                    },
                  ],
                },
                {
                  key: 'status',
                  label: '校验状态',
                  children: [
                    {
                      componentName: 'Select',
                      props: {
                        placeholder: '请选择',
                        clearable: true,
                      },
                      options: [
                        { value: '0', label: '审批中' },
                        { value: '1', label: '已通过' },
                        { value: '2', label: '已驳回' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      componentName: 'DIV',
      props: {
        className: 'footer-block',
      },
      children: [
        {
          componentName: 'DIV',
          props: {
            className: 'footer-con',
          },
          children: [
            {
              componentName: 'Button',
              props: {
                type: 'text',
              },
              children: '取消',
              onClick: `function handleGoBack() {
                this.$router.go(-1);
              }`,
            },
            {
              componentName: 'Button',
              props: {
                type: 'primary',
              },
              dataKey: 'submitLoading',
              children: '提交',
              onClick: `function handleSubmit() {
                if (this.submitLoading) return
                this.$refs.formRef.validate(async valid => {
                  console.log('this.form', this.form)
                  if (!valid) return false
          
                  const params = {
                    ...this.form,
                  }
                  params.crossStatus = Number(params.crossStatus)
                  params.detailList = this.multipleSelection
                  deleteEmptyParam(params)
          
                  const { code } = await API.updateRecord(params, this)
                  if (code === 200) {
                    this.$message.success('提交成功')
                    this.isReturnDirect = true
                    this.handleGoBack()
                  }
                })
              }`,
            },
          ],
        },
      ],
    },
  ],
  dataSource: {
    colProps: {
      xs: 24,
      sm: 12,
      lg: 8,
      xl: 8,
    },
    submitLoading: false,
    title: '编辑商品',
  },
  lifeCycle: {
    componentDidMount: `function componentDidMount() {
      this.getRecordDetail();
    }`,
    beforeRouteLeave: `function beforeRouteLeave(to, from, next) {
      if (this.isReturnDirect) {
        next(true)
      } else {
        this.$modal
          .confirm('返回将不保留已生成结果。', '确认返回吗？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            next(true)
          })
          .catch(e => {
            next(false)
          })
      }
    }`,
  },
  methods: {
    getRecordDetail: `async function getRecordDetail() {
      const params = { id: this.recordId }
      const { code, data } = await API.getRecordDetail(params, this)
      if (code === 200 && data) {
        this.form = data
      }
    }`,
  },
  imports: {
    '{ deleteEmptyParam }': '@/utils',
    '* as API': './api',
  },
  apis: {
    imports: {
      UmiRequest: '@du/umi-request',
    },
    getRecordDetail: `function getRecordDetail(params) {
      return UmiRequest.request({
        method: 'POST',
        url: '/api/v1/h5/oversea/backend/product/detail',
        data: params,
        vm,
        loading: 'loading'
      })
    }`,
    updateRecord: `function updateRecord(params, vm) {
      return UmiRequest.request({
        method: 'POST',
        url: '/api/v1/h5/oversea/backend/product/update',
        data: params,
        vm,
        loading: 'submitLoading'
      })
    }`,
  },
};

export { DSL };