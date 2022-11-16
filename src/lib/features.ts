export class APIfeatures {
  query: any;
  queryString: any;
  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating = () => {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = limit * (page - 1);
    this.query = this.query.limit(limit).skip(skip);
    return this;
  };

  sorting = () => {
    const sort = this.queryString.sort || "-createdAt";
    this.query = this.query.sort(sort);
    return this;
  };

  searching = () => {
    const search = this.queryString.search;
    if (search) {
      this.query = this.query.find({
        $text: { $search: search },
      });
    } else {
      this.query = this.query.find();
    }
    return this;
  };

  filtering = () => {
    const queryObj = { ...this.queryString };
    // { page: '1', limit: '7', title: { regex: 'men' }, price: { lte: '15.99' } }

    // { page: '1', limit: '7', title_regex: 'men', price_lte: '15.99' }

    const excludedFields = [];
    for (let key in queryObj) {
      const regex = /_gte|_gt|_lt|_lte|_regex/gi;
      if (key.search(regex) < 1) {
        excludedFields.push(key);
      }
    }

    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = "";
    //{"title":{"$regex":"men"},"price":{"$lte":"15.99"}}
    Object.keys(queryObj).forEach((key, index) => {
      let str = JSON.stringify(key)
        .replace("_", '":{"$')
        .concat(`: "${queryObj[key]}"}`);

      if (index < Object.keys(queryObj).length - 1) {
        queryStr += str + ",";
      } else {
        queryStr += str;
      }
    });

    this.query = this.query.find(JSON.parse(`{${queryStr}}`));
    return this;
  };

  counting = () => {
    this.query = this.query.count();
    return this;
  };
}
