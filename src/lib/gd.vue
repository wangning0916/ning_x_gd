<template>
  <!-- 归档登记表 -->
  <div class="fd-gddjb">
    <div class="fd-gddjb-head">
      <div class="fd-gddjb-center">
        <a href="javascript:void(0)">预览/打印</a>
      </div>
    </div>
    <div class="fd-gddjb-center">
      <div class="fd-gddjb-con">
        <h3>归档案件登记表</h3>
        <div class="fd-gddjb-radio">
          <div class="fd-radio-item red">
            正卷是否可互联网借阅
            <aty-radio-group v-model="ifread">
              <aty-radio code="1" radio-label="是" :disabled="type === 2"></aty-radio>
              <aty-radio code="2" radio-label="否" :disabled="type === 2"></aty-radio>
            </aty-radio-group>
            <div class="fd-radio-item" v-if="ifread == 2">
              不可互联网借阅理由：<aty-input v-model="ifreadText" style="width:100px;"></aty-input>
            </div>
          </div>
          <div class="fd-radio-item">
            是否区分正副卷
            <aty-radio-group v-model="formData.sfqfzfj">
              <aty-radio code="1" radio-label="是" :disabled="type === 2"></aty-radio>
              <aty-radio code="2" radio-label="否" :disabled="type === 2"></aty-radio>
            </aty-radio-group>
          </div>
        </div>
        <table>
          <tr>
            <td class="fd-gddjb-left rowspan" rowspan="5">交接信息<i>保存后不可修改</i></td>
          </tr>
          <tr>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>立卷日期</td>
            <td>
              <span v-if="type == 2" v-text="formData.ljsj"></span>
              <aty-date-picker v-else type="date" placeholder="选择立卷日期" v-model="formData.ljsj" value-format="yyyy-MM-dd"></aty-date-picker>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>立卷人</td>
            <td>
              <span v-if="type === 2" v-text="formData.ljr"></span>
              <aty-select v-else :data="ljrList" v-model="formData.ljr"></aty-select>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>提交归档日期</td>
            <td>
              <span v-if="type === 2" v-text="formData.gdrq"></span>
              <aty-date-picker v-else type="date" placeholder="选择归档日期" v-model="formData.gdrq" value-format="yyyy-MM-dd"></aty-date-picker>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>提交归档人</td>
            <td>
              <span v-if="type === 2" v-text="formData.gdr"></span>
              <aty-select v-else :data="tjgdrList" v-model="formData.gdr"></aty-select>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>检查人</td>
            <td>
              <span v-if="type === 2" v-text="formData.jcr"></span>
              <aty-select v-else :data="jcrList" v-model="formData.jcr"></aty-select>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>检查时间</td>
            <td>
              <span v-if="type === 2" v-text="formData.jcsj"></span>
              <aty-date-picker v-else type="date" placeholder="选择检查时间" v-model="formData.jcsj" value-format="yyyy-MM-dd"></aty-date-picker>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>生效日期</td>
            <td>
              <span v-if="type === 2" v-text="formData.sxrq"></span>
              <aty-date-picker v-else type="date" placeholder="选择生效日期" v-model="formData.sxrq" value-format="yyyy-MM-dd"></aty-date-picker>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>接收人</td>
            <td>
              <span v-if="type === 2" v-text="formData.jsr"></span>
              <aty-select v-else :data="jsrList" v-model="formData.jsr"></aty-select>
            </td>
          </tr>
          <!-- 卷宗信息 -->
          <tr>
            <td class="fd-gddjb-left rowspan" rowspan="12" v-if="formData.sfqfzfj == 1">卷宗信息</td>
            <td class="fd-gddjb-left rowspan" rowspan="10" v-else>卷宗信息</td>
          </tr>
          <tr v-if="formData.sfqfzfj == 1">
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>正卷册数</td>
            <td>
              <span v-if="type === 2" v-text="formData.zjcs"></span>
              <aty-input v-else v-model="formData.zjcs"></aty-input>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>正卷页数</td>
            <td>
              <span v-if="type === 2" v-text="formData.zjys"></span>
              <aty-input v-else v-model="formData.zjys"></aty-input>
            </td>
          </tr>
          <tr v-if="formData.sfqfzfj == 1">
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>副卷册数</td>
            <td>
              <span v-if="type === 2" v-text="formData.fjcs"></span>
              <aty-input v-else v-model="formData.fjcs"></aty-input>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>副卷页数</td>
            <td>
              <span v-if="type === 2" v-text="formData.fjys"></span>
              <aty-input v-else v-model="formData.fjys"></aty-input>
            </td>
          </tr>
          <tr v-if="formData.sfqfzfj == 2">
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>卷宗册数</td>
            <td>
              <span v-if="type === 2" v-text="formData.jzcs"></span>
              <aty-input v-else v-model="formData.jzcs"></aty-input>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>卷宗页数</td>
            <td>
              <span v-if="type === 2" v-text="formData.jzys"></span>
              <aty-input v-else v-model="formData.jzys"></aty-input>
            </td>
          </tr>
          <tr v-if="formData.sfqfzfj == 1">
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>正卷密级</td>
            <td>
              <span v-if="type === 2" v-text="formData.zjmj"></span>
              <aty-select v-else :data="mjList" v-model="formData.zjmj"></aty-select>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>副卷密级</td>
            <td>
              <span v-if="type === 2" v-text="formData.fjmj"></span>
              <aty-select v-else :data="mjList" v-model="formData.fjmj"></aty-select>
            </td>
          </tr>
          <tr v-if="formData.sfqfzfj == 2">
            <td class="fd-gddjb-left">案卷总册数</td>
            <td>
              <span v-if="type === 2" v-text="formData.ajzcs"></span>
              <aty-select v-else :data="mjList" v-model="formData.ajzcs"></aty-select>
            </td>
            <td class="fd-gddjb-left">案件总页数</td>
            <td>
              <span v-if="type === 2" v-text="formData.ajzys"></span>
              <aty-select v-else :data="mjList" v-model="formData.ajzys"></aty-select>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left" v-if="formData.sfqfzfj == 2"><i v-if="type !== 2">*</i>卷宗密级</td>
            <td v-if="formData.sfqfzfj == 2">
              <span v-if="type === 2" v-text="formData.jzmj"></span>
              <aty-select v-else :data="mjList" v-model="formData.jzmj"></aty-select>
            </td>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>保管期限</td>
            <td :colspan="formData.sfqfzfj == 2 ? '' : 3">
              <span v-if="type === 2" v-text="formData.bgqx"></span>
              <aty-select v-else :data="qxList" v-model="formData.bgqx"></aty-select>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">证物情况</td>
            <td colspan="3">
              <span v-if="type === 2" v-text="formData.zwqk"></span>
              <aty-textarea v-else v-model="formData.zwqk"></aty-textarea>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">庭审光盘</td>
            <td>
              <aty-radio-group v-model="formData.tsgp">
                <aty-radio code="1" radio-label="有"></aty-radio>
                <aty-radio code="2" radio-label="无"></aty-radio>
              </aty-radio-group>
            </td>
            <td class="fd-gddjb-left">光盘数</td>
            <td>
              <aty-input v-model="formData.gps"></aty-input>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">光/磁盘号</td>
            <td></td>
            <td class="fd-gddjb-left">缺少光盘原因</td>
            <td>
              <aty-textarea v-model="formData.qsgpyy"></aty-textarea>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">并卷情况</td>
            <td>
              <aty-textarea v-model="formData.bjqk"></aty-textarea>
            </td>
            <td class="fd-gddjb-left">鉴定情况</td>
            <td>
              <aty-textarea v-model="formData.jdqk"></aty-textarea>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>档号</td>
            <td>
              <aty-input v-model="formData.dh"></aty-input>
            </td>
            <td class="fd-gddjb-left">档案封存</td>
            <td>
              <aty-radio-group v-model="formData.dafc">
                <aty-radio code="1" radio-label="是"></aty-radio>
                <aty-radio code="2" radio-label="否"></aty-radio>
              </aty-radio-group>
            </td>
          </tr>
          <tr v-if="formData.sfqfzfj == 1">
            <td class="fd-gddjb-left"><i v-if="type !== 2">*</i>全宗号</td>
            <td>
              <aty-input v-model="formData.qzh"></aty-input>
            </td>
            <td class="fd-gddjb-left">目录号</td>
            <td>
              <aty-input v-model="formData.mlh"></aty-input>
            </td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">卷宗号</td>
            <td>
              <aty-input v-model="formData.jzh"></aty-input>
            </td>
            <td class="fd-gddjb-left">备注</td>
            <td>
              <aty-textarea v-model="formData.bz"></aty-textarea>
            </td>
          </tr>
          <!-- 二审返回信息 -->
          <tr>
            <td class="fd-gddjb-left rowspan" rowspan="6">二审返回信息<i>默认读取二审法院数据不用填写</i></td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">二审法院</td>
            <td></td>
            <td class="fd-gddjb-left">二审案号</td>
            <td></td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">承办人</td>
            <td></td>
            <td class="fd-gddjb-left">承办庭室</td>
            <td></td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">二审立案日期</td>
            <td></td>
            <td class="fd-gddjb-left">二审结案日期</td>
            <td></td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">结案方式</td>
            <td></td>
            <td class="fd-gddjb-left">结案方式对应事由</td>
            <td></td>
          </tr>
          <tr>
            <td class="fd-gddjb-left">案件来源</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="fd-gddjb-buttons">
        <div class="fd-common-button fd-button-blue" @click="submit(1)">保存</div>
        <div class="fd-common-button fd-button-white" @click="hideModal()">取消</div>
        <div class="fd-common-button fd-button-blue" @click="submit(2)">提交归档</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ifread: '1',
      ifreadText: '',
      ljrList: [
        {
          code: 1,
          name: '立卷人1'
        }
      ],
      jcrList: [
        {
          code: 1,
          name: '检查人1'
        }
      ],
      tjgdrList: [
        {
          code: 1,
          name: '提交归档人1'
        }
      ],
      jsrList: [
        {
          code: 1,
          name: '接收人1'
        }
      ],
      mjList: [
        {
          code: 1,
          name: '公开'
        },
        {
          code: 2,
          name: '内部事项'
        },
        {
          code: 3,
          name: '秘密'
        },
        {
          code: 4,
          name: '机密'
        },
        {
          code: 5,
          name: '绝密'
        },
        {
          code: 6,
          name: '其他'
        },
        {
          code: 7,
          name: '空'
        }
      ],
      qxList: [
        {
          code: 1,
          name: '永久'
        },
        {
          code: 2,
          name: '定期60年'
        },
        {
          code: 3,
          name: '定期20年'
        }
      ],
      formData: {
        sfqfzfj: '1',
        ljsj: '2018-12-06',
        ljr: 1,
        gdrq: '2018-12-06',
        gdr: 1,
        jcr: 1,
        jcsj: '2018-12-07',
        jsr: 1,
        sxrq: '2018-12-06',
        zjcs: 1,
        zjys: 1,
        fjcs: 1,
        fjys: 1,
        jzcs: 1,
        jzys: 1,
        zjmj: 3,
        fjmj: 3,
        ajzcs: 1,
        ajzys: 1,
        jzmj: 3,
        bgqx: 1,
        zwqk: '',
        tsgp: 1,
        gps: 1,
        gcph: '',
        qsgpyy: '缺少光盘原因',
        bjqk: '并卷情况',
        jdqk: '鉴定情况',
        dh: 'dh123456',
        dafc: 1,
        qzh: 'qzh123456',
        mlh: 'mlh123456',
        jzh: 'jzh123456',
        bz: '备注'
      }
    }
  },
  props: {
    type: {
      type: Number
    },
    sksqk: {
      type: Number
    }
  },
  mounted () {
    if (this.type === 1) {
      this.clearParams()
    } else if (this.type === 2) {
      this.getData()
    }
  },
  watch: {
    type: function (newValue, oldValue) {
      if (this.type === 1) {
        this.clearParams()
      } else if (this.type === 2) {
        this.getData()
      }
    }
  },
  methods: {
    // 立卷人接口
    // 检查人接口
    // 提交归档人接口
    // 接收人接口
    // 提交、保存
    submit (type) {
      if (!this.formData.larq) {
        this.$message.error('立案日期日期不能为空！')
      } else if (!this.formData.ljr) {
        this.$message.error('立卷人不能为空！')
      } else if (!this.formData.gdrq) {
        this.$message.error('归档日期不能为空！')
      } else if (!this.formData.jcr) {
        this.$message.error('检查人不能为空！')
      } else if (!this.formData.tjgdr) {
        this.$message.error('提交归档人不能为空！')
      } else if (!this.formData.jsr) {
        this.$message.error('接收人不能为空！')
      } else {
        // 保存接口
        if (type === 1) {

        } else {
          // 提交归档接口
        }
      }
    },
    // 取消
    hideModal () {
      this.$emit('close-modal')
    },
    // 登记归档清空参数
    clearParams () {
      for (let p in this.formData) {
        let v = this.formData[p]
        if (typeof (v) === 'string') {
          if (p === 'sfqfzfj') {
            this.formData[p] = '1'
          } else {
            this.formData[p] = ''
          }
        } else {
          if (p === 'zjmj' || p === 'fjmj' || p === 'jzmj') {
            this.formData[p] = 3
          } else {
            this.formData[p] = null
          }
        }
      }
    },
    // 编辑归档 数据回显
    getData () {
    }
  }
}
</script>
<style lang="less">
  /* 归档登记表 */
  .fd-gddjb{
    padding-bottom: 20px;
    height: 700px;
    overflow: auto;
    .aty-radio-wrapper{
      color: #666;
      margin-right: 0px;
      margin-left: 5px;
    }
    .fd-gddjb-center{
      width: 968px;
      margin: 0px auto;
      text-align: left;
    }
    .fd-gddjb-head{
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      a{
        font-size: 14px;
        color: #367edf;
        margin-right: 60px;
        float: right;
      }
    }
    .fd-gddjb-con{
        background-color: #fff;
        padding: 50px;
        padding-top: 0px;
        border-radius: 4px;
        h3{
            font-size: 30px;
            color: #333;
            text-align: center;
            margin-bottom: 50px;
        }
        .fd-gddjb-radio{
            text-align: right;
            margin-bottom: 10px;
        color: #ff0000;
        .fd-radio-item{
          display: inline-block;
          vertical-align: middle;
          margin-left: 30px;
          color: #666;
        }
        .red{
          color: #ff0000;
        }
      }
      .aty-form-item{
        margin: 0px;
        vertical-align: middle;
      }
    table{
        width: 100%;
        margin: 0px auto;
        td{
            border: 1px solid #ddd;
            padding: 8px 10px;
            vertical-align: middle;
            font-size: 16px;
            color: #565656;
            height: 66px;
        }
        .fd-gddjb-left{
            text-align: right;
            width: 150px;
            padding: 8px 10px;
            padding-left: 0px;
            color: #888;
            i{
                color: #ff0000;
                margin-right: 4px;
            }
        }
        .rowspan{
            width: 100px;
            text-align: center;
            padding: 0px;
            i{
                display: block;
                color: #ff0000;
                font-size: 12px;
                margin-top: 10px;
            }
        }
    }
}
    .fd-gddjb-buttons{
        text-align: center;
    }
  }
</style>
