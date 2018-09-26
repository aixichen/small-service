'use strict';
const Service = require('egg').Service;

class AccountService extends Service {
  async index(query, currentPage, pageSize) {
    const build = {};
    if (query.name) {
      build.name = {
        $like: '%' + query.name + '%',
      };
    }

    if (query.phone) {
      build.phone = {
        $like: '%' + query.phone + '%',
      };
    }
    if (query.remark) {
      build.remark = {
        $like: '%' + query.remark + '%',
      };
    }

    if (query.date) {
      const start_time = query.date + ' 00:00:00';
      const end_time = query.date + ' 23:59:59';
      build.updated_at = {
        $between: [ start_time, end_time ],
      };
    }
    const offset = pageSize * (currentPage - 1);
    const limit = pageSize;
    const result = {};
    result.list = await this.ctx.model.Account.findAll({
      where: build,
      offset,
      limit,
      order: [[ 'updated_at', 'desc' ]],
    });

    const tempTotal = await this.ctx.model.Account.count({ where: build });
    result.pagination = {};
    result.pagination.pageSize = pageSize;
    result.pagination.currentPage = currentPage;
    result.pagination.total = tempTotal;
    return result;
  }

  async create(data) {
    return await this.ctx.model.Account.create(data);
  }
  async update(user_id, data) {
    data.uid = user_id;
    const account = await this.ctx.model.Account.findById(data.id);
    return await account.update(data);
  }
}

module.exports = AccountService;
