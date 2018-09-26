'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async index() {
    try {
      const ctx = this.ctx;
      const { remark, name, phone, date } = ctx.query;
      const query = {};
      if (remark) {
        query.remark = remark;
      }

      if (name) {
        query.name = name;
      }
      if (phone) {
        query.phone = phone;
      }

      if (date) {
        query.date = date;
      }
      const { currentPage, pageSize } = ctx.helper.pagingParam(ctx.query);
      const result = await ctx.service.account.index(query, currentPage, pageSize);
      ctx.body = result;
    } catch (error) {
      this.ctx.helper.error(this.ctx, 404, error.message);
    }
  }

  /**
   * 添加
   */

  async create() {
    try {
      const ctx = this.ctx;
      const input = ctx.request.body;
      const data = [];
      if (input.name) {
        data.name = input.name;
      } else {
        this.ctx.throw(404, '姓名必填');
      }

      if (input.phone) {
        data.phone = input.phone;
      } else {
        this.ctx.throw(404, '联系方式必填');
      }
      await ctx.service.account.create(input);
      const result = '';
      ctx.body = result;
    } catch (error) {
      this.ctx.helper.error(this.ctx, 404, error.message);
    }

  }

  async update() {
    try {
      const ctx = this.ctx;
      const input = ctx.request.body;
      const user_id = ctx.state.user.id;

      if (!input.id) {
        throw new Error('id参数错误');
      }

      await ctx.service.account.update(user_id, input);
      const account_type = input.account_type;
      if (!account_type) {
        throw new Error('account_type参数错误');
      }
      const query = {};
      query.account_type = account_type;
      const { currentPage, pageSize } = ctx.helper.pagingParam(ctx.query);
      const result = await ctx.service.account.index(user_id, query, currentPage, pageSize);
      ctx.body = result;
    } catch (error) {
      this.ctx.helper.error(this.ctx, 404, error.message);
    }

  }
}
module.exports = AccountController;
